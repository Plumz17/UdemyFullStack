import express from "express";
import bodyParser from "body-parser";
import { name } from "ejs";

const app = express();
const port = 3000;
let nameLength = "";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const {fName, lName} = req.body;
  nameLength = fName.length + lName.length;
  res.render("index.ejs", {
    nameLength: nameLength
  })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
