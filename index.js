const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config()



const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('products'));
app.use(fileUpload());

const port = 5000;


app.get('/', (req, res) => {
    res.send('Hello World!')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mugzz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const productCollection = client.db("honeyBee").collection("products");


//     app.post('/addProducts', (req, res) => {
//         const file = req.files.file;
//         const name = req.body.name;
//         const price = req.body.price;
//         const newImg = file.data;
//         const encImg = newImg.toString('base64');
//         file.mv(`${__dirname}/product/${file.name}`, err => {
//             if (err) {
//                 console.log(err)
//                 return res.status(500).send({ msg: 'Failed to upload Image' });
//             }
//             return res.send({ name: file.name, path: `${file.name}` })
    

//     var image = {
//         contentType: file.mimetype,
//         size: file.size,
//         img: Buffer.from(encImg, 'base64')
//     };
// productCollection.insertOne({ name, price, image })
//     .then(result => {
//         res.send(result.insertedCount > 0);
//     })
// })
// app.post('/addProduct', (req, res) => {
//     const newProduct = req.body;
// })


app.get('/products', (req, res) => {
    productCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
});

})

app.listen(process.env.PORT || port)