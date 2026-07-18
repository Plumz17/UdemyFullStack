import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "anders1729",
  port: 5432,
});
db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

async function checkUser() {
  const result = await db.query("SELECT * FROM users");
  let users = result.rows;
  return users;
}

async function checkVisitedByUser(id) {
  const result = await db.query("SELECT v.country_code FROM users AS u JOIN visited_countries AS v ON u.id = v.user_id WHERE u.id = $1;", [id]);
  let countries = [];
  result.rows.forEach(country => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  const countries = await checkVisitedByUser(currentUserId);
  const users = await checkUser();
  const currentUser = users.find((user) => user.id == currentUserId);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color,
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    if (result.rows.length == 0) {
      return res.redirect("/");
    }

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  // Run when user clicks on a user
  if ("user" in req.body) {
    currentUserId = req.body.user;
    res.redirect("/");
  }
  // Run when user clicks on new user
  else if ("add" in req.body){
    res.render("new.ejs");
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const newName = req.body.name;
  const newColor = req.body.color;
  const result = await db.query("INSERT INTO users (name, color) VALUES ($1, $2) RETURNING id", [newName, newColor]);
  currentUserId = result.rows[0].id;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
