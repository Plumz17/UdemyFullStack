import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import * as fs from 'node:fs';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// Middleware to turn the HTML's request's body to a format that's understandable by JS (if this part is omitted req.body won't exist).
app.use(express.urlencoded({extended:true}));

// Handle GET request
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})

// Handle POST request
app.post("/submit", (req, res) => {
  // The Data that we're going to send to the user
  let data = `<h1> Your Band Name </h1> 
              <p>${req.body.street} ${req.body.pet}</p>`;
  // Send the data back
  res.send(data);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
