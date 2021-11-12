const express = require('express');
const bodyParser = require('body-parser') ;
const cors = require('cors') ;
require('dotenv').config();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p5q9k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const port = 9000;
const app = express()

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));





app.get('/', (req, res) => {
    res.send('Hello Sir ! Welcome to Aladin Tours and Travel server...')
})


client.connect(err => {
    const servicesCollection = client.db("AldinTravels").collection("servicesData");
   
    
    // Add service

    app.post("/addServices", async (req, res) =>{
        
        const result =await servicesCollection.insertOne(req.body);
        res.send(result);


    });


    //Get All Services 
    app.get("/allServices", async(req, res)=> {

        const result = await servicesCollection.find({}).toArray();
        res.send(result);

    });


    //Get single Service
    app.get("/singleProduct/:id", async(req, res) => {
      
        const result = await servicesCollection.find({_id: ObjectId(req.params.id)}).toArray();
 
        res.send(result[0]);
    });



});
  

app.listen(port, () => {
    console.log(`Running On the port:${port}`)
});


