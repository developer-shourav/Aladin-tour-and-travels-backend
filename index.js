const express = require('express')
const { MongoClient } = require('mongodb')
require('dotenv').config()

const app = express()
const port = 9000 ;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p5q9k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
    try{
       await client.connect();
       console.log('database connected');
    }

    finally{
        // await client.close()
    }

}

run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello Sir ! Welcome to Aladin Deliver service server...')
})

app.listen(port, () => {
    console.log(`Running On the port:${port}`)
})