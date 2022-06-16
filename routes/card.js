const { Router } = require("express");
const router = Router();
const Card = require("../model/Card");
const Prodcuts = require("../model/product");

// View card
router.get("/", async (req, res) => {
  const card = await Card.getCard();
  res.render("card", {
    card,
    title: "Shopping card",
  });
});

// Add product to card
router.post("/add", async (req, res) => {
  const product = await Prodcuts.findById(req.body.id);
  await Card.add(product);
  res.redirect("/product");
});

router.delete("/delete/:id", async (req, res) => {
  const card = await Card.removeById(req.params.id);
  res.send(card);
});

module.exports = router;
