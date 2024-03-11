const express = require('express');
const mongoose = require('mongoose');
const product = require('./models/productModel');
const app = express();
app.use(express.json()) 
const uri = "mongodb+srv://shreyaagrawal2121:Dhananjay1@cluster0.pirzayb.mongodb.net/my-db1?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri).then(() => {
    console.log('Connected to database');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    })

    
}).catch((err) => {
    console.log('Error: ', err);
});
app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/add_data', (req, res) =>{
    console.log('Data added');
    console.log(req.body);
    res.send(req.body);
});

app.post('/add_product', (req, res) => {
    console.log(req.body);
    const productData = new product({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        expiryDate: new Date(req.body.expiryDate)
    });
    productData.save();
    console.log(productData);
    res.send('Product data added');
});