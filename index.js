const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Kids Shop Server is Running");
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cybkh1s.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const categoryCollection = client.db("kidsShop").collection("categories");
    const productsCollection = client.db("kidsShop").collection("products");

    //get categories data
    app.get("/categories", async (req, res) => {
      const query = {};
      const categories = await categoryCollection.find(query).toArray();
      res.send(categories);
    });

    //get dress category
    app.get("/products/dress", async (req, res) => {
      const query = { category: "Dress" };
      const result = await productsCollection
        .find(query)
        .sort({ $natural: -1 })
        .toArray();
      res.send(result);
    });

    //get toys category
    app.get("/products/toys", async (req, res) => {
      const query = { category: "Toys" };
      const result = await productsCollection
        .find(query)
        .sort({ $natural: -1 })
        .toArray();
      res.send(result);
    });

    //get Bags category
    app.get("/products/bags", async (req, res) => {
      const query = { category: "Bags" };
      const result = await productsCollection
        .find(query)
        .sort({ $natural: -1 })
        .toArray();
      res.send(result);
    });

    //get Shoes category
    app.get("/products/shoes", async (req, res) => {
      const query = { category: "Shoes" };
      const result = await productsCollection
        .find(query)
        .sort({ $natural: -1 })
        .toArray();
      res.send(result);
    });

    //get winter Collections category
    app.get("/products/winterCollections", async (req, res) => {
      const query = { category: "Winter Collections" };
      const result = await productsCollection
        .find(query)
        .sort({ $natural: -1 })
        .toArray();
      res.send(result);
    });

    //get accessories category
    app.get("/products/accessories", async (req, res) => {
      const query = { category: "Accessories" };
      const result = await productsCollection
        .find(query)
        .sort({ $natural: -1 })
        .toArray();
      res.send(result);
    });

    //API for add Product
    app.post("/product", async (req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product);
      res.send(result);
    });

    //
  } finally {
  }
}
run().catch((error) => console.log(error));

app.listen(port, () => {
  console.log("Server is Running on Port", port);
});
