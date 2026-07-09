import express from "express";

const app = express();
const port = 3000;

let blogs = [];
let currBlog = {blogTitle: "", blogContent: ""};

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        blogs: blogs,
        currentBlogTitle: currBlog.blogTitle,
        currentBlogContent: currBlog.blogContent,
        currentBlogIndex: currBlog.index
    });
    currBlog = {blogTitle: "", blogContent: ""};
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

app.post("/edit", (req, res) => {
    const index = parseInt(req.body.index);
    currBlog = {
        blogTitle: blogs[index].blogTitle,
        blogContent: blogs[index].blogContent,
        index: index
    };
    res.redirect("/");
})

app.post("/update", (req, res) => {
    const index = parseInt(req.body.index);
    blogs[index].blogTitle = req.body.blogTitle;
    blogs[index].blogContent = req.body.blogContent;
    res.redirect("/");
})

app.listen(port, () => {
    console.log("Server started at port " + port);
})