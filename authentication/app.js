const express = require('express');
const {MongoClient} = require('mongodb');
const {config} = require('dotenv')
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const nodeCache= require("node-cache");
const userOpsRoute = require("./routes/users");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://shifamuskaan27:shifa321@cluster0.poocm6v.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

app.use("/userRoute",userOpsRoute);

app.listen(5800, () => {
    console.log('Server is running on port 5800');
});
