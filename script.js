const express = require("express");
const app = express();
const Joi = require("joi");
const path = require("path");
const { create } = require("express-handlebars");

const homePage = require("./routes/homePage");
const product = require("./routes/addProduct");
const contact = require("./routes/contact");
const addProduct = require("./routes/addProduct");
const card = require("./routes/card");

const exhbs = create({
  extname: "hbs",
  defaultLayout: "main",
});

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("hbs", exhbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use("/404", (req, res) => {
  res.render("404", {
    title: 404,
  });
});
app.use("/", homePage);
app.use("/addProducts", product);
app.use("/contact", contact);
app.use("/", addProduct);
app.use("/card", card);

try {
  const port = normalizePort(process.env.port || 5000);
  app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
  });
} catch (error) {
  console.log(error);
}

function normalizePort(val) {
  let port = parseInt(val);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}
