const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./database/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
dotenv.config({ path: "config.env" });

connectDB();

// Controllers
const itemController = require("./controllers/itemController");

// API Endpoints
app.get("/api/items", itemController.getAllItems);
app.get("/api/items/:id", itemController.getItemById);
app.post("/api/items/add", itemController.addItem);
app.post("/api/items/update/:id", itemController.updateItemById);
app.delete("/api/items/:id", itemController.deleteItemById);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
