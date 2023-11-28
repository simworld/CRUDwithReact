const Item = require("../models/itemModel");

// Get all items
exports.getAllItems = (req, res) => {
  Item.find()
    .exec()
    .then((items) => res.json(items))
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Get an item by ID
exports.getItemById = (req, res) => {
  Item.findById(req.params.id)
    .exec()
    .then((item) => res.json(item))
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Add a new item
exports.addItem = (req, res) => {
  const newItem = new Item(req.body);

  newItem
    .save()
    .then(() => res.json("Item added!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

// Update an item by ID
exports.updateItemById = (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .exec()
    .then((item) => res.json(item))
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Delete an item by ID
exports.deleteItemById = (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => res.json("Item deleted!"))
    .catch((err) => res.status(500).json({ error: err.message }));
};
