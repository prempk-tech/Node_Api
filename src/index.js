const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const cors = require('cors');

// mongoDB url
const mongoString = "mongodb://localhost:27017/prem-assesment";

// router files
const studentRouter = require('./routes/student');

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');4
})
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/student', studentRouter)

app.use((req, res, next) => {
    res.status(404).send({"status":404,"message":"API URL Not Found","error":true});
  });

app.listen(3002, () => {
    console.log(`Server Started at ${3002}`)
})