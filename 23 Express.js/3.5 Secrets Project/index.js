//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const password = "edwin";
var isAuthenticated = false;

// Middleware to turn the HTML's request's body to a format that's understandable by JS (if this part is omitted req.body won't exist).
app.use(express.urlencoded({extended:true}));

function checkPassword(req, res, next) {
    isAuthenticated = false;
    if (password === req.body.password) {
        isAuthenticated = true;
    }
    next();
}

// This (and every) middleware will run before every request
app.use(checkPassword);

// Handle GET request
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})

// Handle POST request
app.post("/check", (req, res) => {
    console.log(req.body);
    const enteredPassword = req.body.password;
    if (isAuthenticated) {
        res.sendFile(__dirname + "/public/secret.html");
    }
    else {
        res.redirect("/");
    }
})

// Start Server
app.listen(port, () => {
    console.log(`Server hosted in port ${port}.`)
})