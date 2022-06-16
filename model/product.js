const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");

class Products {
  constructor(type, year, price, img) {
    this.type = type;
    this.year = year;
    this.price = price;
    this.img = img;
  }

  toObj() {
    return {
      type: this.type,
      year: +this.year,
      price: +this.price,
      img: this.img,
      id: uuid(),
    };
  }

  async save() {
    const products = await Products.getAll();
    const product = this.toObj();

    products.push(product);
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "products.json"),
        JSON.stringify({ products }),
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  static async getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "products.json"),
        "utf-8",
        (err, content) => {
          if (err) reject(err);
          else resolve(JSON.parse(content).products);
        }
      );
    });
  }

  static async findById(id) {
    const products = await Products.getAll();
    return new Promise((resolve, reject) => {
      const product = products.find((product) => product.id === id);
      if (!product) {
        return reject("Product is not found");
      }
      resolve(product);
    });
  }

  static async removeById(id) {
    let products = await Products.getAll();
    return new Promise((resolve, reject) => {
      let idx = products.findIndex((product) => product.id === id);
      if (idx === -1) {
        return reject("Book id is not true");
      }
      products.splice(idx, 1);
      fs.writeFile(
        path.join(__dirname, "..", "data", "products.json"),
        JSON.stringify({ products }),
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  static async updateById(id, body) {
    let products = await Products.getAll(); // []

    return new Promise((resolve, reject) => {
      let idx = products.findIndex((product) => product.id === id);
      if (idx === -1) {
        return reject("Book id is not true");
      }

      body.id = id;

      products[idx] = body;

      fs.writeFile(
        path.join(__dirname, "..", "data", "products.json"),
        JSON.stringify({ products }),
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }
}

module.exports = Products;
