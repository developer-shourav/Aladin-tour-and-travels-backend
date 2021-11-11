const express = require('express');
const bodyParser = require('body-parser') ;
const cors = require('cors') ;
require('dotenv').config();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p5q9k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const port = 9000;
const app = express()

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));





app.get('/', (req, res) => {
    res.send('Hello Sir ! Welcome to Aladin Deliver service server...')
})


client.connect(err => {
    const servicesCollection = client.db("AldinTravels").collection("servicesData");
   
    
    // Add service

    app.post("/addServices", async (req, res) =>{
        
        const result =await servicesCollection.insertOne(req.body);
        
        res.send(result);


    });


    //Get All Services 
    app.get("/tours", async(req, res)=> {

        const result = await servicesCollection.find({}).toArray();
        res.send(result);


    })



});
  

app.listen(port, () => {
    console.log(`Running On the port:${port}`)
});