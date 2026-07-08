import express from "express";

const app = express();
const port = 3000;

app.use(express.json({extended: true}));

app.listen(port, () => {
    console.log("Server started at port " + port);
})