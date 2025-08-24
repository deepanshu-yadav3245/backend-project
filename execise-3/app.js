
const express =  require('express')
const app = express();
const bcrypt = require('bcrypt') // encryption and decryption
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cookieParser())

// app.get("/",function(req,res){
//       res.cookie("name","rahul");  // how to set cookie
//       res.send("done");
// })


// ------------bcrypt-------

// app.get("/",function (req,res){
//     bcrypt.genSalt(10,function(err,salt){
//         bcrypt.hash("polopolopl",salt,function(err,hash){
//             // store hash in your password BD
//             console.log(hash)
//         });
//     });
// }) ;

// -------JWT-----------
 app.get("/" , function (req,res) {
     let token =   jwt.sign({email: "rahul@coding.com"}, "secret")
     res.cookie("token",token);
     res.send("Done")
 })

app.get("/read", function (req,res){
  let data = jwt.verify(req.cookies.token,"secret")
  console.log(data)
})

app.listen(3000) 