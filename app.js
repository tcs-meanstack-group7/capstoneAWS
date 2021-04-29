//Load all required modules 
const path = require('path')
let app = require("express")();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");
const express = require('express');

app.use(express.static(process.cwd()));

const passportJWT = require('./middlewares/passportJWT')();
const errorHandler = require('./middlewares/errorHandler');
const empRoutes = require("./routers/emp");
const userRoutes = require("./routers/user");

var employeeController = require('./controllers/employeeController.js');
var ProductController = require('./controllers/ProductController.js');
var FundsController = require('./controllers/FundsController.js')
var OrdersController = require('./controllers/OrderController.js')
var emp = require('./controllers/emp.controller')


//Database URL Details 
let url = "mongodb://localhost:27017/meanstack";

app.get('/', (req,res) => {
    res.sendFile(__dirname+"/index.html")
})

//middleware enable data from post method.
app.use(bodyParser.urlencoded({ extended: true })); // enable body part data  
app.use(bodyParser.json()); // json data. 
app.use(cors()); // enable cors policy 
app.use(express.static(path.join(__dirname, "public")));
app.use(passportJWT.initialize());

//Database connection without warning 
const mongooseDbOption = { // to avoid warning 
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url, mongooseDbOption); //ready to connect 

//Connect the data 
mongoose.connection

//link to router module like a import concept. 
var Product = require("./routers/product.router.js");

//URL 


//Middleware 

// http://localhost:9090/product/allProductDetails   Get App Product Details 
// http://localhost:9090/product/retrieveProductById/102   Get App Product Details by Id  
// http://localhost:9090/product/storeProductDetails    rest client or post man {"pid":103,"pname":"Computer","price":43000}
// http://localhost:9090/product/deleteProductById/101
// http://localhost:9090/product/updateProductPrice  update price using pid {"pid":103,"price":48000}

// http://localhost:9090/RaiseTicket/postEmployee      INSERT RAISE TICKET MODEL {"useremailid":"tej@gma.com","reason":"random reason"}
// http://localhost:9090/Orders/PostOrderDetails      TO POST THE ORDER DETAILS INTO COLLECTION

app.use("/product",Product)

app.use('/api/emp', empRoutes);
app.use('/api/user', userRoutes);
app.use(errorHandler)

app.use('/RaiseTicket', employeeController);
app.use('/requests', employeeController);
app.use('/Product', ProductController);
app.use('/funds', FundsController);
app.use('/orders', OrdersController);

//app.use("/order",Order)
//app.use("/customer",Customer)
// http://localhost:9090/api/user/signUp
// http://localhost:9090/api/user/login

//http://localhost:9090/api/emp/editProfile


app.listen(9090, () => console.log("Server running on port number 9090"));