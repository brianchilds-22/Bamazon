# Bamazon Node.js and MySQL Project

I created the Bamazon Customer app with the SQL database with the products, inventory, department, price and quantity.


![mySQL file](https://github.com/brianchilds-22/Bamazon/blob/master/markdown/Screenshot%20(3).png)


I then created the **bamazonCustomer.js** file, the client can identify the product and quantity that they would like to buy.
If the client selects a quantity that is higher than the selected products inventory the phrase "Insufficient Quantity"
is shown. If the client types a product that is not on the list the phrase "Item not available" is shown.
If the client selects a product on the list and a quantity that is lower than the inventory then the app will fulfill the 
customer's order, update the database minus the inventory of the product purchased and show the cost of the purchase.
The client will see two phrases "Product Purchased" and "Total Purchase Price: $ ".

![mySQL file](https://github.com/brianchilds-22/Bamazon/blob/master/markdown/Screenshot%20(3).png)


The second app I created was the Bamazon Manager version. I used the same SQL database and created the bamazonManager.js file
The client can select View Products for Sale, View Low Inventory, Add to Inventory, Add New Product.
The first option, View Products for Sale, shows the most recent product database. 
The second option, View Low Inventory, shows all products with inventory under 5 items.
The third option, Add to Inventory, asks what item to add iventory to and a quantity. The phrase "Quantity Updated" is
shown upon completion. The last option is to Add new products, The client can type in a product name,
price, stock quantity and department and the info will ba added to the app. 
I had already completed most of the project before learning more about being able to create a table in Node.
If I have the opportunity I would like to put all the info into a table so it is easier for the client to navigate.
