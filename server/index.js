const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://mltriasl:Hazitagen2110@cluster0.mjdp36a.mongodb.net/MERN?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/getUsers", (req, res) => {
  console.log("Route /getUsers was called");
  UserModel.find({})
    .then((result) => {
      if (result.length === 0) {
        console.log("No users found");
        return res.status(404).send("No users found.");
      }
      console.log("Users found:", result);
      res.json(result);
    })
    .catch((err) => {
      console.error("Error retrieving users:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.listen(3001, () => {
  console.log("server runs");
});
