const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config()

const users = ['asad', 'MOin', 'saber', 'Susmita', 'Sohana', 'sabana'];

const app = express()

app.use(cors());
// parse application/json
app.use(bodyParser.json())

const dbUser = process.env.DB_USER;
const pass = process.env.DB_PASS;
const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true });


app.get('/products', (req, res) =>{
   client = new MongoClient(uri, { useNewUrlParser: true });
   client.connect(err => {
      const collection = client.db("shopStore").collection("users");
      // collection.find({ name: "Laptop"}).toArray((err, documents) => { // for limit and filter
      collection.find().limit(10).toArray((err, documents) => {
            if(err){
               console.log(err);
               res.status(500).send({message:err})
            }else{
               res.send(documents)
            }
         });
         client.close();
      });
})


app.get('/users/:id', (req, res)=>{
   const id = req.params.id;
   const name = users[id];
   res.send({id, name});
});

//post
app.post('/addProduct', (req, res) => {
   client = new MongoClient(uri, { useNewUrlParser: true });
   const product = req.body;
   
   client.connect(errror => {
   const collection = client.db("shopStore").collection("users");
   collection.insertOne(product, (err, result) => {
         if(err){
            console.log(err);
            res.status(500).send({message:err})
         }else{
            res.send(result.ops[0])
         }
      });
      client.close();
   });
})

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Listentng to Port 4000'));
