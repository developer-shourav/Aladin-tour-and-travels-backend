const express = require('express');
const bodyParser = require('body-parser') ;
const cors = require('cors') ;
require('dotenv').config();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p5q9k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const port = process.env.PORT || 9000;
const app = express()

// Middleware
const corsConfig = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    }
app.use(cors(corsConfig))
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));





app.get('/', (req, res) => {
    res.send('Hello Sir ! Welcome to Aladin Tours and Travel')
})


client.connect(err => {
    const servicesCollection = client.db("AldinTravels").collection("servicesData");
    const bookingsCollection = client.db("AldinTravels").collection("bookings");
   
    
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


   //Confirm Orders
   app.post("/confirmOrder", async (req, res) => {
       const result = await bookingsCollection.insertOne(req.body);
      res.send(result);

   });

      //  My confirmOrders
      app.get("/myOrders/:email", async(req, res) => {
          const result = await bookingsCollection.find({email:req.params.email}).toArray();
          res.send(result);
      })  



      //Delete Order 
      app.delete("/deleteOrder/:id",async (req, res) =>{
          const result = await bookingsCollection.deleteOne({_id: ObjectId(req.params.id),});

          res.send(result);
      });
    

      //update statuses
      app.put("/updateStatus/:id", (req, res) => {
          const id = req.params.id;
          const updateStatus =req.body.status;
          const filter = {_id: ObjectId(id)};
          console.log(updateStatus);
          bookingsCollection.updateOne(filter,{ $set: {status:updateStatus}, })
          .then((result) => {
              res.send(result);
          });
      })

});
  

app.listen(port, () => {
    console.log(`Running On the port:${port}`)
});


