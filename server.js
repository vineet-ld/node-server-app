const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3002;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

hbs.registerHelper("currentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {

    var log = `${new Date().toString()}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync("server.log", log + "\n");
    next();

});

/*app.use((req, res, next) => {

    res.render("maintenance.hbs", {
        pageTitle: "We are under Maintenance",
        message: "See you soon"
    });

});*/

app.get("/", (req, res) => {

    res.render("home.hbs", {
        pageTitle: "Home Page",
        message: "Welcome"
    });

});

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About Page"
    });
});

app.get("/projects", (req, res) => {
    res.render("projects.hbs", {
        pageTitle: "Projectsabout.hbs Page"
    });
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "Some error occured"
    });
});

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});