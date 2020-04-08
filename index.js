const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const users = ['asad', 'MOin', 'saber', 'Susmita', 'Sohana', 'sabana'];


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:R1811170120@cluster0-camld.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("shopStore").collection("products");
  // perform actions on the collection object
  collection.insertOne({
     name: "Laptop",
     price: 2000,
     stock: 10
  }, (err, res) => {
     console.log('successfully inserted....');
  })
  console.log('database connected...');
  client.close();
});



const app = express()

app.use(cors());
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) =>{
   const fruit = {
      product: 'ada',
      price: 200,
   }
   res.send(fruit)
})
// app.get('/fruits/banana', (req, res) => {
//    res.send({frut: 'banana', quantity: 1000, Price: 10000})
// })

app.get('/users/:id', (req, res)=>{
   const id = req.params.id;
   const name = users[id];
   res.send({id, name});
});

//post
app.post('/addUser', (req, res) => {
   //save to database
   const user = req.body;
   user.id = 44;
   res.send(user);
})

app.listen(4000, () => console.log('Listentng to Port 4000'));
