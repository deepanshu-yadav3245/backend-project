// const express = require('express');
// const app = express();

// const userModel = require('./usermodel');

// app.get('/',(req,res) =>{
//      res.send("hey");
// })

// app.get('/create', async (req,res) =>{
//    let createdUser =   await userModel.create({
//         name:"Rahulyadav",
//         email:"rahulyadav@mail.com",
//         username: "kl-rahul"
//      })
//      res.send(createdUser);
// })


// app.get('/update', async (req,res) =>{
     
//     //userModel.findOneUpdate(findone,update,{new:true}) synatx 
//    let updateduser = await userModel.findOneAndUpdate({username:"rahul"},{name:"Rahul kumar yadav"},{new:true})
//      res.send(updateduser);
// })

// app.get('/read', async (req,res) =>{
//    let users = await userModel.find();
//    res.send(users);
// })

// app.get('/delete', async (req,res) =>{
//    let users = await userModel.findOneAndDelete({username:"kl-rahul"});
//    res.send(users);
// })


// // app.listen(3000)
// const express = require('express');
// const app = express();
// const Path = require('path');
// const userModel = require('./models/user');
// const user = require('./models/user');


// // Corrected this line
// app.set("view engine", "ejs");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(Path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.render("index");
// });

// app.get('/read', async (req, res) => {
//     let users = await userModel.find();
//   res.render("read",{users});
// });

// app.post('/create', async (req, res) => {
//    let {name,email,image} = req.body;

//  let createdUser =  await userModel.create({
//         name,
//         email,
//         image
//    });

//     res.redirect("/read")
    
// });


// app.get('/edit/:userid', async (req, res) => {
//   let user =   await userModel.findOne({_id: req.params.userid})
//   res.render("edit",{user})
// });

// app.post('/update/:userid', async (req, res) => {
//   let {image,name,email} = req.body;
//   let user =   await userModel.findOneAndUpdate({_id: req.params.userid},{image,name,email},{new:true})
//   res.redirect("/read");
// });


// app.get('/delete/:id', async (req, res) => {
//     let users = await userModel.findOneAndDelete({_id :req.params.id});
//   res.redirect("/read");
// });



// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });

const express = require('express');
const app = express();
const Path = require('path');
const userModel = require('./models/user');

// Set view engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(Path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render("index");
});

app.get('/read', async (req, res) => {
  let users = await userModel.find();
  res.render("read", { users });
});

app.post('/create', async (req, res) => {
  let { name, email, image } = req.body;
  await userModel.create({ name, email, image });
  res.redirect("/read");
});

app.get('/edit/:userid', async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.userid });
  res.render("edit", { user });
});

app.post('/update/:userid', async (req, res) => {
  let { name, email, image } = req.body;
  await userModel.findOneAndUpdate({ _id: req.params.userid }, { name, email, image }, { new: true });
  res.redirect("/read");
});

app.get('/delete/:id', async (req, res) => {
  await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

// Start server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

