const express = require('express');

const app = express();

app.listen(3000);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/add_data', (req, res) =>{
    console.log('Data added');
    console.log(req.query.name);
    console.log(req.body);
    res.send('Data added');
})