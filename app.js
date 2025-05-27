const express =require("express");
const bodyParser = require("body-parser");
var app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://proddaturirakshith:ywGtAIdIanxVosmX@project-todo.w2aaa9y.mongodb.net/?retryWrites=true&w=majority&appName=Project-todo")
const trySchema =new mongoose.Schema({
    name:String
});
const item = mongoose.model("task",trySchema);
app.get("/",async function(req,res){
    try{
        const foundItems =await item.find({});
    res.render("list",{items :foundItems});
    }
    catch(err){
        console.error(err);
        res.status(500).send("Error fetching item");
    }   
});
app.post("/",function(req,res){
    const itemName =req.body.ele1.trim();
    if(!itemName){
        return res.redirect("/");
    }
    const todo5 =new item({
        name:itemName
    });
    todo5.save();
    res.redirect("/");
});
app.post("/delete",async function(req,res){
    const checked =req.body.checkbox1;
    try{
    await item.findByIdAndDelete(checked);
    res.redirect("/");
    }
    catch(err){
        console.error(err);
        res.status(500).send("Failed to delete item");
    }
});
app.listen(3000,function(){
    console.log("Server is running");
});
