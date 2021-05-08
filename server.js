const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const Item = require("./models/Item");

// Connect Database
connectDB();

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

app
  .get("/", async (req, res) => {
    const items = await Item.find();

    if (items) {
      res.render("index", { items });
    } else {
      res.status(404).json({ msg: "No items found" });
    }
  })
  .post("/item/add", async (req, res) => {
    const newItem = new Item({
      name: req.body.name,
    });

    await newItem.save();

    res.redirect("/");
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
