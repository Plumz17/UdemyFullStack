import express from "express";

const app = express();
const port = 3000;

let blogs = [];

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", {blogs: blogs});
})

app.post("/submit", (req, res) => {
    let newPost = {
        blogTitle: req.body.blogTitle,
        blogContent: req.body.blogContent
    }
    // Inserts at beginning instead of end
    blogs.unshift(newPost);
    res.redirect("/");
})

app.post("/delete", (req, res) => {
    blogs.splice(parseInt(req.body.index), 1);
    res.redirect("/");
})

app.listen(port, () => {
    console.log("Server started at port " + port);
})