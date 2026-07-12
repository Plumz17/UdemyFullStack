import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;
const BASE_URL = "https://api.rawg.io/api";
const apiKey = process.env.RAWG_API_KEY;
const topPages = 67 //Determines how many of top pages of the games are taken in the randomizer (1 page has 10 games)

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(BASE_URL + "/games", {
            params: {
                key: apiKey,
                page_size: 10,
                ordering: "-metacritic",
                page: Math.floor(Math.random() * topPages) + 1
            }
        });
        const randomGameData = response.data.results[Math.floor(Math.random() * 10)];
        console.log(randomGameData.name + randomGameData.background_image);
        res.render("index.ejs", {
            gameName: randomGameData.name,
            gameImageURL: randomGameData.background_image
        });
    } catch (error) {
        console.log(error.message);
        res.send(error.code);
    }
})

app.listen(port, () => {
    console.log("Server started in port "+ port);
})