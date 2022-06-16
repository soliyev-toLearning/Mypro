const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Products = require("../model/product");

router.get("/product", async (req, res) => {
  const productsFind = await Products.getAll();
  res.render("product", {
    title: "All Products",
    products: productsFind,
  });
});

router.get("/addProducts", (req, res) => {
  res.render("addProducts");
});

// get with id //works
router.get("/info/:id", async (req, res) => {
  Products.findById(req.params.id)
    .then((product) => {
      res.render("info.hbs", {
        product,
        title: product.name,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).redirect("/404");
    });
});

//POST //works
router.post("/addProduct", async (req, res) => {
  let productSchema = Joi.object({
    type: Joi.string().required(),
    price: Joi.number().required(),
    img: Joi.string().required(),
  });
  const result = productSchema.validate(req.body);
  if (!!result.error) {
    res.status(406).send(result.error.message);
    return;
  }
  const product = new Products(req.body.type, req.body.price, req.body.img);

  await product.save();
  res.status(201).redirect("/product");
});

router.get("/update/:id", async (req, res) => {
  const oldProduct = await Products.findById(req.params.id);

  res.render("edite", {
    oldProduct,
    title: oldProduct.name,
  });
});

// Update book
router.post("/update/:id", async (req, res) => {
  await Products.updateById(req.body.id, req.body);
  res.redirect("/product");
});

// remove by id
router.get("/remove/:id", async (req, res) => {
  const id = req.params.id;
  Products.removeById(id)
    .then(() => {
      res.redirect("/product");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/404");
    });
});

module.exports = router;
