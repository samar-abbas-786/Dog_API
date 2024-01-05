const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

///DATABASE CONNECTIONS

mongoose.connect("mongodb://localhost:27017/hellodb").then(() => {
  console.log("Successfully Connected");
});
const DogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  isGoodBoys: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const Dog = mongoose.model("Dog", DogSchema);
module.exports = Dog;
