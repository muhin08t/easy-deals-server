const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_SECRET}@cluster0.vtojw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const userCollection = client.db("easy-deals").collection("users");

    // Fetch all users
    app.get("/users", async (req, res) => {
      const query = userCollection.find();
      const result = await query.toArray();
      res.send(result);
    });

    // Fetch all Categories
    const categoryCollection = client.db("easy-deals").collection("categories");
    app.get("/categories", async (req, res) => {
      const query = categoryCollection.find();
      const result = await query.toArray();
      res.send(result);
    });
            // Add a new Category to the collection
            app.post("/categories", async (req, res) => {
              const category = req.body;
              const result = await categoryCollection.insertOne(category);
              res.send(result);
            });

    // Fetch all Products
    const productsCollection = client.db("easy-deals").collection("products");
    app.get("/products", async (req, res) => {
      const query = productsCollection.find();
      const result = await query.toArray();
      res.send(result);
    });

        // Add a new Proudct to the collection
        app.post("/products", async (req, res) => {
          const product = req.body;
          const result = await productsCollection.insertOne(product);
          res.send(result);
        });

    // Fetch Categorybased Products
    const categoryBasedproductsCollection = client
      .db("easy-deals")
      .collection("products");
    app.get("/category/products/:cat_id", async (req, res) => {
      const cat_id = parseInt(req.params.cat_id); // Convert to number if necessary
      const query = { cat_id: cat_id };
      const result = await categoryBasedproductsCollection
        .find(query)
        .toArray();
      res.send(result);
    });

    // Fetch a user by Firebase uid
    app.get("/user/:uid", async (req, res) => {
      const uid = req.params.uid;
      const query = { uid: uid };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    // Fetch a product by product id
    app.get("/products/:_id", async (req, res) => {
      const _id = req.params._id;
      const query = { _id: new ObjectId(_id) };
      const result = await productsCollection.findOne(query);
      res.send(result);
    });

    // Add a new user to the collection
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // Update user by id
    app.put("/user/:id", async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };
      console.log({ user });
      const updatedUser = {
        $set: {
          displayName: user.displayName,
          email: user.email,
          phone: user.phone,
          photoUrl: user.photoUrl,
          address: user.address,
          isAdmin: user.isAdmin,
          isBlocked: user.isBlocked,
        },
      };

      const result = await userCollection.updateOne(
        filter,
        updatedUser,
        option
      );
      res.send(result);
    });

    // Delete user by id
    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
    // Messages Section
    // Create message
    app.post("/messages", async (req, res) => {
      const { title, message, email } = req.body;
      const messageCollection = client.db("easy-deals").collection("messages");

      const newMessage = {
        title,
        message,
        email,
        createdAt: new Date(),
      };

      const result = await messageCollection.insertOne(newMessage);
      res.send(result);
    });
    // Get all messages
    app.get("/messages", async (req, res) => {
      const messageCollection = client.db("easy-deals").collection("messages");
      const messages = await messageCollection.find().toArray();
      res.send(messages);
    });
    // Get message by id
    app.get("/messages/:id", async (req, res) => {
      const id = req.params.id;
      const messageCollection = client
        .db("totTheMasterDB")
        .collection("messages");
      const message = await messageCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(message);
    });

    // Purchase products
    app.post("/purchase", async (req, res) => {
      const { productName, price, phone, quantity, comment, email, customerId } =
        req.body;
      const purchaseCollection = client.db("easy-deals").collection("purchase");

      const newPurchase = {
        productName,
        price,
        phone,
        quantity,
        comment,
        email,
        customerId,
        createdAt: new Date(),
      };

      const result = await purchaseCollection.insertOne(newPurchase);
      res.send(result);
    });

    // Fetch Purchased Products
    const userdproductsCollection = client
      .db("easy-deals")
      .collection("purchase");
    app.get("/purchase_products/:customerId", async (req, res) => {
      const customerId = req.params.customerId; // Convert to number if necessary
      const query = { customerId: customerId };
      const result = await userdproductsCollection.find(query).toArray();
      res.send(result);
    });

    // await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");
  } finally {
    // await client.close(); // Commented out for persistent connection
  }
}
run().catch(console.error);

app.get("/", (req, res) => {
  res.send("Eeasy deals Server is running!");
});

app.listen(port, () => {
  console.log(`Easy deals Server running on port ${port}`);
});
