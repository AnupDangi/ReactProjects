require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const mongoose=require('mongoose');
require("./db/index");

const blogRouter=require("./routes/Blog");

const app = express();
app.use(express.json());
app.use(cors());

require("./model/Blog");
const port = process.env.PORT || 5000;

app.use("/blogs",blogRouter);

// Routes
app.get("/", (req, res) => {
    res.send("This is the index page");
});

// app.get("/blogs", (req, res) => {
//     res.send("This is the blogs page");
// });

// 404 handler - should be the last route
app.use((req, res) => {
    res.status(404).send("404 Not Found");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});