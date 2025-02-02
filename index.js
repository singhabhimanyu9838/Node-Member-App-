const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const methodOverride = require('method-override');
let posts = require("./lists.json");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/Home", (req, res) => {
    // res.send("Page is rendering");
    res.render("index.ejs", { posts });
})
app.post('/Home/search', (req, res) => {
    const id = req.body.id; 
    let post = posts.find((p) => Number(id) === p.id);
    console.log(post);
    if( posts.find((p) => Number(id) === p.id)){
        let post = posts.find((p) => Number(id) === p.id);
        res.render("view.ejs", { post });
    }else{
        res.render("nofound.ejs");
    }
    
});

app.get("/Home/view/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let post = posts.find((p) => Number(id) === p.id);
    console.log(post);
    res.render("view.ejs", { post });
})
app.get("/Home/new_member", (req, res) => {
    console.log("NEw member")
    res.render("newmember.ejs");
})
app.post("/Home", (req, res) => {
    let { first_name, last_name, email, id, gender,image } = req.body;
    posts.push({ first_name, last_name, email, id, gender,image });
    console.log(req.body);
    res.redirect("/Home");
})

app.get("/Home/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => Number(id) === p.id);
    res.render("edit.ejs", { post });
    console.log(post);

})
app.patch("/Home/:id", (req, res) => {
    let { id } = req.params;
    let newimage = req.body.image;
    let newfirst_name = req.body.first_name;
    let newlast_name = req.body.last_name;
    let newemail = req.body.email;
    let newgender = req.body.gender;
    let post = posts.find((p) => Number(id) === p.id);

    post.image = newimage;
    post.first_name = newfirst_name;
    post.last_name = newlast_name;
    post.email = newemail;
    post.gender = newgender;

    console.log(post);
    res.redirect("/Home");

})

app.delete("/Home/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => Number(id) !== p.id)
    res.redirect("/Home");
})

app.listen(port, () => {
    console.log(`App is listening on port : ${port}`);
})