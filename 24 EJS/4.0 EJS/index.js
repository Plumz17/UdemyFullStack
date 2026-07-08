import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server running at port ${port}.`);
})

app.get("/", (req, res) => {
    const dayIndex = (new Date()).getDay();
    let currentWeekName = "";
    let currentWeekText = "";
    if (dayIndex === 0 || dayIndex === 6) {
        currentWeekName = "weekend";
        currentWeekText = "have fun";
    }
    else {
        currentWeekName = "weekday";
        currentWeekText = "work hard";
    }
    res.render(__dirname + "/views/index.ejs", 
        {
            weekName: currentWeekName,
            weekText: currentWeekText
        }
    )
})