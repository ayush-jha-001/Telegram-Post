const express = require("express");
const app = express();
const path = require("path");
const {v4 : uuidV4} = require("uuid");
const methodOverride = require("method-override");

const port = 8080;
app.set("veiw engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));

let posts = [
    {
        id: uuidV4(),
        username: "hello_world",
        ideas: "Without Me no one start programming language"
    },
    {
        id: uuidV4(),
        username: "Ayush Jha",
        ideas: "Always maintain consistancy until you win."
    }
]

app.get("/posts", (req, res) => {
    res.render("home.ejs", {posts});
})
app.get("/posts/new", (req, res) =>{
    res.render("newPost.ejs");
})
app.post("/posts/new", (req, res)=>{
    let {username, ideas} = req.body;
    let id = uuidV4();
    posts.push({id, username, ideas});
    res.redirect("/posts");
})
app.get("/posts/:id",(req, res)=>{
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => {
       return id === p.id;
    })
    res.render("show.ejs", {post})
})
app.patch("/posts/:id",(req, res)=>{
    let {id} = req.params;
    let {ideas} = req.body;
    let post = posts.find((p) => {
       return id === p.id;
    })
    post.ideas = ideas;
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req, res)=>{
    let {id} = req.params;
    let post = posts.find((p) => {
       return id === p.id;
    })
    res.render("edit.ejs", {post});
})
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => {
       return id === p.id;
    })
    posts = posts.filter((post)=>{
        return post.id != id;
    })
    res.redirect("/posts");
})


app.listen(port, ()=> {
    console.log("Listening on port: ", port);
})