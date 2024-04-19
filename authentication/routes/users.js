const express = require("express");
const User = require("../models/users");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require('multer');
const path = require('path');
//const { request } = require("http");
let upload = multer();


const router = express.Router();

// Middleware
router.use(express.static('public'));
/*router.use(express.static(__dirname + '/public'));*/
router.use(express.json());
router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
router.use(upload.array());
router.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

// Routes
router.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/registration.html'));
})

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/login.html'));
})
router.post('/regUser',async(req,res)=>{
    const userDetails = new User({
        firstName : req.body.firstname,
        lastName : req.body.lastname,
        password: req.body.password,
        username : req.body.username
    })
    try{
        const userDetailsSave = await userDetails.save();
        res.json({key:"/userRoute/login"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
});

router.get('/views/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/login.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/login.html'));
});

router.post('/loginReq', async (req, res) => {
    const loginUser = new User({
        password:req.body.password,
        username:req.body.username
    })
    try {
        const loginFind = await User.find({password:req.body.password,username:req.body.username});
        if(loginFind){
            req.session.loggedUser = req.body.username;
            res.json({key:"/userRoute/loggedin",id:req.session.users})
        }
        else if (!user) {
            return res.status(404).send('User not found');
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in');
    }
});

router.get('/loggedin',function(req,res){
    if(req.session.loggedUser && Object.keys(req.session.loggedUser).length){
        res.sendFile(path.join(__dirname, '../../views/loggedin.html'));
    }else{
        res.sendFile(path.join(__dirname, '../../views/login.html'));
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error logging out');
        }
        res.status(200).send({key:'/userRoute/login'});
    });
});

module.exports = router;