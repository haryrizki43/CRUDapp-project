const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

// Koneksi ke MongoDB
mongoose.connect("mongodb+srv://Haryrizki:Minecraft@cluster0.xaacrre.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Membuat skema untuk data
const itemSchema = new mongoose.Schema({
  field1: String,
  field2: String,
  field3: String,
  field4: String,
  field5: String,
  field6: String,
  field7: String,
});

const Item = mongoose.model("Item", itemSchema);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Rute untuk halaman utama
app.get("/", async (req, res) => {
  try {
    const items = await Item.find({});
    res.render("index", { items: items });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Rute untuk menambahkan item baru
app.post("/addItem", (req, res) => {
  const newItem = new Item({
    field1: req.body.field1,
    field2: req.body.field2,
    field3: req.body.field3,
    field4: req.body.field4,
    field5: req.body.field5,
    field6: req.body.field6,
    field7: req.body.field7,
  });

  newItem.save();
  res.redirect("/");
});

// Rute untuk menghapus item
app.post("/deleteItem", async (req, res) => {
  try {
    const itemId = req.body.itemId;
    await Item.findByIdAndDelete(itemId).exec();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Rute untuk halaman edit item
app.get("/editItem/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).exec();
    res.render("edit", { item: item });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Rute untuk menyimpan perubahan item yang diedit
app.post("/editItem/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedItem = {
      field1: req.body.field1,
      field2: req.body.field2,
      field3: req.body.field3,
      field4: req.body.field4,
      field5: req.body.field5,
      field6: req.body.field6,
      field7: req.body.field7,
    };

    await Item.findByIdAndUpdate(itemId, updatedItem).exec();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
