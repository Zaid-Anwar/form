const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Connect to your MongoDB database (replace with your database URI)
mongoose.connect('mongodb+srv://zaidanwar410:0987654321zaid@zaid-cluster.zbrlpzf.mongodb.net/zaid?retryWrites=true&w=majority').then((res)=>{
    console.log("Connected!")
}).catch((err)=>{
    console.log(err.message)
})

// Create a schema for your data
const formDataSchema = new mongoose.Schema({
    name: String,
    email: String,
});

// Create a model
const FormData = mongoose.model("FormData", formDataSchema);

// Middleware for parsing JSON data
app.use(express.json())

// Serve static files (e.g., the HTML and JavaScript files)
app.use(express.static("./index.html"));

// Define a route for handling form submissions
app.post("/submit", async (req, res) => {
    try {
        const { name, email } = req.body;
        const formData = new FormData({ name, email });
        await formData.save();
        res.sendStatus(201);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
