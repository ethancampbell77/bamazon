// required node modules to be installed
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

//MySQL connection info
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }

  // Call of Function to load table
  start();
 });

 //Function to load table and begin shopping
function start() {
    connection.query("SELECT * FROM products", function (err, res) {
      if (err) throw err;
      console.log ("");
      console.log ("");
      console.log ("________________________________________________________________________________________");
      console.log ("");
      console.table(res);    
      console.log ("________________________________________________________________________________________");
      console.log ("");
      console.log ("");

      promptCustomerOrder(res);
  });
}

//Function to "Inquire" about what customer would like to purchase
function promptCustomerOrder(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "Welcome to Bamazon! What is the item ID of the product you'd like to purchase today? (You can Exit with Q)",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      checkExit(val.choice);
      let choiceID = parseInt(val.choice);
      let product = checkInventory(choiceID, inventory);

      if(product) {
        promptOrderQuantity(product);
      }
      else{
        console.log ("");
        console.log ("");
        console.log("\nThis Product is currently out of stock, Please check back soon!")
        console.log ("___________________________________________________________________________");
        console.log ("___________________________________________________________________________");
        console.log ("");
        console.log ("");
        start();
      }
    });
  
//Function to "Inquire" about how many of selected item the customer would like to purchase
function promptOrderQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to add to your cart? (You can Exit with Q)",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      checkExit(val.quantity);
      var quantity = parseInt(val.quantity);

      if(quantity > product.stock_quantity) {
        console.log ("");
        console.log ("");
        console.log("\nInsufficient quantity! We currently have " + product.stock_quantity + " on hand. Please select fewer");
        console.log ("__________________________________________________________________________________________________________");
        console.log ("__________________________________________________________________________________________________________");
        console.log ("");
        console.log ("");
        start();
      }
      else {
        makePurchase(product, quantity);
      }
    });
}

// function for completing purchase and updating inventory
function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      // Let the user know the purchase was successful, re-run loadProducts
      console.log ("");
      console.log ("");
      console.log("\nYou've successfully purchased " + quantity + " " + product.product_name + ". Your order should arrive this week!");
      console.log ("_________________________________________________________________________________________________________________");
      console.log ("_________________________________________________________________________________________________________________");
      console.log ("");
      console.log ("");
      start();
    }
  );
}

// Function to assess on-hand inventory
function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      return inventory[i];
    }
  }
  return null;
}

// Function to exit app
function checkExit(choice) {
  if (choice.toLowerCase() === "q") {
    console.log ("");
    console.log ("");
    console.log("Thank You for shopping at Bamazon, Please come again");
    console.log ("___________________________________________________________________________");
    console.log ("___________________________________________________________________________");
    console.log ("");
    console.log ("");
    process.exit(0);
  }
}}

