import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { distance  } from "fastest-levenshtein";
dotenv.config();

const app = express();
const port = 3000;
const BASE_URL = "https://api.rawg.io/api";
const apiKey = process.env.RAWG_API_KEY;
const topPages = 67; //Determines how many of top pages of the games are taken in the randomizer (1 page has 10 games)
let score = 0;
let highScore = 0;
let currentGameTitle = "";
let currentGameImage = "";
let shownGameID = [];

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

function normalizeString(str) {
    return str.toLowerCase().trim().replace(/[^a-z0-9]/g, "");
}

function checkAnswers(userInput, correctAnswer) {
    const normalizedInput = normalizeString(userInput);
    const normalizedAnswer = normalizeString(correctAnswer);

    // Check if the input and answer are the exact same
    if (normalizedInput === normalizedAnswer) return true;

    // Check if the input is a part of the answer
    if (normalizedAnswer.includes(normalizedInput) && normalizedInput.length > 4) return true;

    // Check if the guess is close enough using the levenshtein library
    const calculatedDistance = distance(normalizedInput, normalizedAnswer);
    const threshold = Math.max(1, Math.floor(normalizedAnswer.length * 0.15))
    console.log(`${normalizedInput} vs ${normalizedAnswer} with a score of ${calculatedDistance} with a threshold of ${threshold}`);
    if (calculatedDistance <= threshold) return true;

    // Return false if the previous criteria isnt filled
    return false;
}

async function getRandomGamePage() {
    const response = await axios.get(BASE_URL + "/games", {
        params: {
            key: apiKey,
            page_size: 10,
            ordering: "-added",
            metacritic: "50, 100",
            page: Math.floor(Math.random() * topPages) + 1
        }
    });
    return response.data.results;
}

function isUsableGame(game) {
    return Boolean(game.background_image) && !shownGameID.includes(game.id);
}

function pickRandomGame(games) {
    return games[Math.floor(Math.random() * games.length)];
}

app.get("/", async (req, res) => {
    try {
        const gamePage = await getRandomGamePage();
        const usableGames = gamePage.filter(isUsableGame);
        if (usableGames.length === 0) {
            shownGameID = [];
            gamePage.filter(isUsableGame);
        }
        const randomGameData = pickRandomGame(usableGames);
        shownGameID.push(randomGameData.id)
        currentGameTitle = randomGameData.name;
        currentGameImage = randomGameData.background_image;
        res.render("index.ejs", {
            gameImageURL: currentGameImage,
            score: score,
            highScore: highScore
        });
    } catch (error) {
        console.log(error.message);
        res.send(error.code);
    }
})

app.post("/", (req, res) => {
    res.redirect("/");
})

app.post("/check", (req, res) => {
    let message = "";
    if (checkAnswers(req.body.gameTitle, currentGameTitle)) {
        message = "Correct! The answer is";
        score++;
        if (score > highScore) {
            highScore = score;
        }
    }
    else {
        message = "Wrong! The answer is";
        score = 0;
    }
    res.render("result.ejs", {
        message: message,
        gameTitle: currentGameTitle,
        gameImageURL: currentGameImage,
        score: score,
        highScore: highScore
    });
})


app.listen(port, () => {
    console.log("Server started in port "+ port);
})