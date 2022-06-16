const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "data", "card.json");

class Card {
  static async add(product) {
    let card = await Card.getCard();
    const idx = card.products.findIndex((item) => item.id === product.id);
    if (idx === -1) {
      product.count = 1;
      card.products.push(product);
    } else {
      product.count = card.products[idx].count + 1;
      card.products[idx] = product;
    }

    card.price = card.price + +product.price;

    return new Promise((res, rej) => {
      fs.writeFile(dir, JSON.stringify(card), (err) => {
        if (err) rej(err);
        else res();
      });
    });
  }

  static async getCard() {
    return new Promise((res, rej) => {
      fs.readFile(dir, "utf-8", (err, data) => {
        if (err) rej(err);
        else res(JSON.parse(data));
      });
    });
  }

  static async removeById(id) {
    const card = await Card.getCard();
    console.log(card);
    const idx = card.products.findIndex((product) => product.id === id);

    card.price = card.price - +card.products[idx].price;

    if (card.products[idx].count === 1) {
      card.products = card.products.filter((product) => product.id !== id);
    } else {
      card.products[idx].count--;
    }

    return new Promise((res, rej) => {
      fs.writeFile(dir, JSON.stringify(card), (err) => {
        if (err) rej(err);
        else res(card);
      });
    });
  }
}

module.exports = Card;
