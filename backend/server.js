//////Imports and definations
const express = require("express")
const server = express();
const {request, respons}= require("http")
const cors = require ("cors")
const mongoose = require("mongoose")
const Product = require ("./models/product")
const port = 3000;
const db_uri="mongodb+srv://ptlrahul2513:Rahul@2513@cluster0.eocogua.mongodb.net/products?retryWrites=true&w=majority"
/////////Middleware
server.use(express.urlencoded({extended:false}))
server.use(express.json())
server.use(cors())


/////Connections.
mongoose.connect(db_uri).then((result) => {
    server.listen(port, () =>{
        console.log(`Listening on ${port}...\nConnected to DB`);
        });
    })
    .catch((error) => {
        console.log(error);
});

///////ROUTES
server.get("/",(request, response) => {
    response.send("LIVE!!");
});

server.get("/products", async (request, response) =>{
    const products = await Products.find()
    response.send(products);
});

server.post("/addProduct", (request, response) =>{
  const product = request.body
  const postProduct = new Product({
    id: product.id,
    productName: product.productName,
    brand: product.brand,
    quantity: product.quantity,
    image: product.image,
    price: product.price,
  });
});