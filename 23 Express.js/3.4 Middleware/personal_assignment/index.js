import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const lifeExpectancy = {
    World: 73,
    Japan: 85,
    USA: 79,
    India: 70
};

// Middlewares to convert Date string into date object
function stringToDate(req, res, next) {
    req.body.dob = new Date(req.body.dob);
    next();
}

// Make it so that req.body exists
app.use(express.urlencoded({extended: true}));

// Change Date string into date object
app.use(stringToDate);

// Send "default html file"
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.post("/submit", (req, res) => {
    let currentYear = (new Date()).getFullYear();
    let dobYear = req.body.dob.getFullYear();
    let userLifeExpectancy = lifeExpectancy[req.body.country];
    let age = currentYear - dobYear;
    let yearsLeft = userLifeExpectancy - age;
    let expiryYear = currentYear + yearsLeft;
    let message = `<h1>Hi ${req.body.name}, you have ${yearsLeft} years left and will expire in ${expiryYear}.</h1>`;
    res.send(message);
})

// Run the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});