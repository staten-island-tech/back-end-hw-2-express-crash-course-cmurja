const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger.js");
const members = require("./Members.js/index.js.js.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Middleware
// app.use(logger);

//Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Homepage Route
app.get("/", (request, response) => {
  response.render("index", {
    title: "Member App",
    members
  });
});

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

//Members API Route
app.use("/api/members", require("./routes/api/members.js"));

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});