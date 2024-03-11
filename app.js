const express = require('express');
const mongoose = require('mongoose');
const product = require('./models/productModel');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false})); 
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
app.get('/get_products', async(req, res) => {
    try{
    const products = await product.find({});
        res.status(200).json({products: products});

    }catch(err){
        console.log('Error: ', err);
        res.status(500).json({error: err.message});
    }
});
app.get('/get_product/:id', async(req, res) => {
    try{
        const {id} = req.params;
    const products = await product.findById(id);
        res.status(200).json(products);

    }catch(err){
        console.log('Error: ', err);
        res.status(500).json({error: err.message});
    }
});
app.put('/update_product/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const productData = await product.findByIdAndUpdate(id, req.body);
        if(!productData){
          return  res.status(404).json({error: "Product not found"});
        }
        const products = await product.findById(id);

        res.status(200).json(products);
    }
    catch(err){
        console.log('Error: ', err);
        res.status(500).json({error: err.message});
    }
});
app.delete('/delete_product/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const productData = await product.findByIdAndDelete(id);
        if(!productData){
          return  res.status(404).json({error: "Product not found"});
        }
        const products = await product.find({});

        res.status(200).json(products);
    }
    catch(err){
        console.log('Error: ', err);
        res.status(500).json({error: err.message});
    }
});
app.post('/add_product', async(req, res) => {
    try{
    console.log(req.body);
    const productData = await new product({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        expiryDate: new Date(req.body.expiryDate)
    });
    productData.save();
    console.log(productData);
    res.send('Product data added');
}catch(err){
    console.log('Error: ', err);
    res.status(500).send('Error: ', err);
}
});