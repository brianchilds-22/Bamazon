var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "TheHacks22",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if(err) throw err;
    updateQuery();
});

function updateQuery() {
    inquirer.prompt([{
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
    }]).then(function(answer) {
        switch(answer.menu) {
            case "View Products for Sale":
                viewProductSale();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;    
            case "Add New Product":
                addNewProduct();
                break;
            case "Quit":
                process.exit();
                break;
        }
    });
};

function viewProductSale() {
    connection.query ("SELECT * FROM Products", function(err,data){
        if(err) throw err;
        console.log();
        console.log("View Product Sale");
        for (var i=0; i < data.length; i++) {
            console.log("Item ID: " + data[i].id + " | " + "Product Name: " + data[i].product_name + 
            " | " + "Department Name: " + data[i].department_name + " | " + "Price: " + data[i].price + " | " + "Stock Quantity: " + data[i].stock_quantity);
            }
        updateQuery();
    });
};

function viewLowInventory() {
    connection.query ("SELECT * FROM Products", function(err,data){
        // if(err) throw err;
        console.log("View Low Inventory");
        for (var i=0; i < data.length; i++) {
            if (data[i].stock_quantity <= 5) {
            console.log("Item ID: " + data[i].id + " | " + "Product Name: " + data[i].product_name + " | " + "Department Name: " + data[i].department_name + " | " + "Price: " + data[i].price + " | " + "Stock Quantity: " + data[i].stock_quantity);
            }
        }
        updateQuery();
    });
};

function addInventory() {
    console.log();
    console.log("Add To Inventory");
    connection.query ("SELECT * FROM Products", function(err,data){
        if(err) throw err;
        var itemsArray = [];
        for (var i=0; i < data.length; i++) {
            itemsArray.push(data[i].product_name);
        }
        inquirer.prompt([{
            type: "list",
            name: "products",
            choices: itemsArray,
            message: "Which item would you like to add Inventory to?"
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to add?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }]).then(function(answer) {
            var currentQuantity;
            for (var i=0; i < data.length; i++) {
                if (data[i].product_name === answer.products) {
                    currentQuantity = data[i].stock_quantity;
                }
            }
            connection.query("UPDATE Products SET? WHERE?",[{stock_quantity:currentQuantity + parseInt(answer.quantity)}, {product_name: answer.products}], function(err,data){
                if (err) throw err;
                console.log("Quantity updated");
                updateQuery();
            });
          });
    });
};

function addNewProduct() {
    console.log();
    console.log("Add new products");

    const questions = [{
        type: "input",
        name: "product",
        message: "Product Name: "
    },
    {
        type: "input",
        name: "price",
        message: "Price: "
    },
    {
        type: "input",
        name: "quantity",
        message: "Stock Quantity: "
    },
    {   type: "input",
        name: "department",
        message: "Department: "

    }];

    inquirer.prompt(questions).then(function(data) {
        let insertQuery = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)";
        connection.query(insertQuery, [data.product,data.department, data.price, data.quantity], function(err,data) {
            console.log("Products Added");
        });
        updateQuery();
    })
}