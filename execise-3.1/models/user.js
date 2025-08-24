const mongoose = require('mongoose');

// ✅ Corrected port: 27017
mongoose.connect('mongodb://127.0.0.1:27017/authtestapp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

// Schema definition
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  age: Number
});

// Model export
module.exports = mongoose.model("User", userSchema);
