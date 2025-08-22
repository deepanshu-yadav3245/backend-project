const express = require('express');
const app = express();
const Path = require('path');
const fs = require('fs')

app.set("view engine", "ejs");
// Express js ko ye bataya ja raha hai ki HTML pages render karne ke liye hum EJS(Embeded JavaScript) template engine ka use karte hain.
//Express ko ye batata hai ki Dynamic HTML pages banane ke liye EJS ka use karo.
// EJS Kya hota hai :- EJS ek templating engine hai jo aapko javascript  ke variable aur logic HTML ke ander likhne deta hai.
// EJS file ka extension .ejs hota hai.
app.use(express.json());
// Express.js ka ek Built-in middleware function hai jiska use incoming JSON data ko automatically parse karne ke liye use Kiya jata hai.
app.use(express.urlencoded({extended:true}))
// Express.js ka middleware hai jiska Use HTML forms se bheje gaye data ko parse karne ke liye hota hai.
//

app.use(express.static(Path.join(__dirname,"public")))  
// iska mtlab hota hai ki Express app ekk specific folder(yahaann'public') ke static files ko serve karega,bina kisi extra route banaye.
// Express.js automatically serve Karega public/ folder ke ander ke sabhi static files ko.

app.get ('/',function(req,res) {
    fs.readdir(`./files`,function(err,files){
         res.render("index",{files : files})
    })  
})


app.get ('/file/:filename',function(req,res) {
     fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
         res.render('show', {filename: req.params.filename ,filedata: filedata}) ;
     }) 
})


app.get ('/edit/:filename',function(req,res) {
    res.render('edit' ,  {filename:req.params.filename});
})

app.post ('/edit',function(req,res) {
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, function(err){
        res.redirect("/")
    })
})


app.post ('/create',function(req,res) {
    fs.writeFile(`./files/${req.body.title.split('').join('')}.txt`, req.body.details,function(err) {
         res.redirect("/")
    });
 });

app.listen(3000);