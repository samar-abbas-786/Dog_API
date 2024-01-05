const express = require("express");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const Dog = require("./models");
const bodyparser = require("body-parser");
const app = express();

app.use(express.json());

// ///DATABASE CONNECTIONS

// mongoose.connect("mongodb://localhost:27017/dog_api");

//HTTP REQUEST
app.get("/", (req, res) => {
  res.send("Congratulations for your First BackEnd Project");
});
app.get("/dogs", async (req, res) => {
  const allDogs = await Dog.find();
  return res.status(200).json(allDogs);
  return res.status(200).json(Dog);
});

// app.get("/dogs/:id", async (req, res) => {
//   const id = req.params.id * 1;
//   const dog = Dog.findById(id);
//   return res.status(200).json(dog);
// });
// app.get("/dogs/:age", async (req, res) => {
//   const age = req.params.age * 1;
//   const dog = await Dog.find((el) => {
//     el.age == age;
//   });
//   return res.status(200).json(dog);
// });

//POST

// app.post("/Createdogs", async (req, res) => {
//   const newDog = new Dog(req.body);
//   const insertedDog = await newDog.save().then(() => {
//     console.log("SAVED");
//     console.log(req.body);
//   });
//   return res.status(201).json(insertedDog);
// });

// app.post("/Createdogs", (req, res) => {
//   Dog.create(req.body).then(() => {
//     res.status(201).json(req.body);
//   });
// });

// app.post("/Createdogs", (req, res) => {
//   Dog.insertMany(req.body).then(() => {
//     res.status(201).send(res.body);
//     console.log("Inserted Many Done");
//   });
// });

// app.patch("/dogs/:id", async (req, res) => {
//   const id = req.params.id * 1;
//   await Dog.updateOne({ id }, req.body);
//   const updatedDog = await Dog.findById(id);
//   return res.status(200).json(updatedDog);
// });

app.get("/allDogs", (req, res) => {
  Dog.find({}).then((dog) => {
    res.status(200).send(dog);
  });
});
app.get("/allDogs/:name", (req, res) => {
  Dog.findById(req.params.name).then((dog) => {
    if (!dog) {
      res.status("404").send("ERROR");
    }
    res.status(200).send(dog);
  });
});
// app.patch("/allDogs/:id", (req, res) => {
//   Dog.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((dog) => {
//     if (!dog) {
//       return res.status(404).send("No dog found and Updated");
//     }
//     return res.status(200).send(dog);
//   });
// });
app.patch("/allDogs/:id", (req, res) => {
  Dog.updateOne({ _id: req.params.id }, req.body, { new: true }).then((dog) => {
    if (!dog) {
      return res.status(404).send("ERROR");
    }
    res.status(200).send(dog);
  });
});
// app.patch("/allDogs/:id", (req, res) => {
//   Dog.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then((dog) => {
//       if (!dog) {
//         res.status(404).send("No dog found and updated");
//       } else {
//         res.status(200).send(dog);
//       }
//     })
//     .catch((error) => {
//       res.status(500).send("Internal Server Error");
//     });
// });
app.delete("/allDogs/:id", (req, res) => {
  Dog.findByIdAndDelete(req.params.id).then((dog) => {
    res.status(200).send("DELETED");
  });
});

// app.delete("/dogs/:id", async (req, res) => {
//   const id = req.params.id * 1;
//   const deletedDog = await Dog.findByIdDelete(id);
//   return res.status(200).json(deletedDog);
// });

app.listen(PORT, console.log(`App is running at ${PORT}`));
