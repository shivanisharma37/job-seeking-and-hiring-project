const express =require("express");
const app = express();
const mongoose= require("mongoose");
const bodyParser= require("body-parser");
const ejs = require('ejs');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use('/register',express.static('register'));
app.use('/images',express.static('images'));
app.use('/main',express.static('main'));

mongoose.connect("mongodb+srv://JobSeekingDB:MydbJobSeeking@clusterjobseekingwebsit.hl6tp.mongodb.net/JobSeekingDatabase" ,{useNewUrlParser:true},{useUnifiedTopology:true})

//create schema
const CollectionSchema= {
    FullName: String,
    Occupation: String,
    Contact: Number,
    Address: String,
    Experience: String,
    DOB: String,
    Education: String,
    Description: String,
    image: String
    
}


const model= mongoose.model("model", CollectionSchema);

app.get("/",function(req, res){
    res.sendFile(__dirname+"/index.html");
    
})

app.get("/views",function(req, res){
    //res.render("mogo_card")
    model.find({},function(err, models) {
        res.render('mogo_card',{
            UserList: models
        })
    })  
})


app.get("/register/submit_form.html",function(req, res){
    res.sendFile(__dirname+"/submit_form.html");
    
})


//app.post
app.post("/register/submit_form.html", function(req, res ){
    let newNode= new model({
        FullName: req.body.Fullname,
        Occupation: req.body.Occupation,
        Contact:req.body.Contact,
        Address: req.body.Address,
        Experience:req.body.Experience,
        DOB: req.body.dob,
        Education: req.body.Education,
        Description: req.body.BreafIntro,
        image: req.body.image
    })
    
    newNode.save();
    res.redirect("/");

})

// app.get("/search/:Occupation", function(req, res){
//     var ragex= new RegExp(req.params.Occupation,'i')
//     //i means it accept both small and capital inputs
//     model.find({Occupation}).then((result){
//     res.status(200).json(result)
//     })
// })
app.listen(3001,function(){
	console.log("server is running on 3001");
})