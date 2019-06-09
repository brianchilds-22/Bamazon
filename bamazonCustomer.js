var mysql = require("mysql");
var inquirer = require('inquirer');
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "TheHacks22",
  database: "bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    // console.log("Test");
    makeTable();
  });

var makeTable = function() {
  connection.query("SELECT * FROM products", function(err,res){
    for (var i=0; i < res.length; i++) {
      console.log(res[i].id+" || "+res[i].product_name+" || "+
      res[i].department_name+" || "+res[i].price+" || "+res[i].stock_quantity+" \n ");
    }
    promptCustomer(res);
  })
}

var promptCustomer = function(res) {
   inquirer.prompt([{ 
    type:'input',
    name:'choice',
    message:"What would you like to purchase? [Quit with Q]"
  }]).then(function(answer){
    var correct = false;
    if (answer.choice.toUpperCase()=="Q") {
      process.exit();
    }
    for (var i=0; i < res.length; i++) {
      if (res[i].product_name==answer.choice) {
        correct=true;
        var product=answer.choice;
        var id=i;
        inquirer.prompt({
          type:"input",
          name:"quant",
          message:"How many would you like to buy?",
          validate:function(value) {
            if (isNaN(value)==false) {
              return true;
            } else {
              return false;
            }
          }
        }).then(function(answer) {
          if ((res[id].stock_quantity-answer.quant)>0) {
            connection.query("UPDATE products SET stock_quantity='"+(res[id].stock_quantity-
            answer.quant)+" ' WHERE product_name='"+product+"'",function(err,res2) {
              console.log("Product Purchased!");
              console.log("Total Purchase Price: $" + parseInt(answer.quant)* parseInt(res[id].price));
              makeTable();
            })
          } else {
            console.log("Insufficient Quantity");
            promptCustomer(res);
          }
        })
      }
    }
    if (i===res.length && correct==false) {
      console.log("Item not available");
      promptCustomer(res);
    }
  })
}

