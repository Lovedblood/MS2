//Important Imports
const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const requireAuth = require("./auth.js");

//Collection Schemas
const Admin = require("./models/Admin.js");
const Product = require("./models/Product.js");
const Customer = require("./models/Customer.js");
const Order = require("./models/Order.js");

//Important Values
const app = express();
var cors = require("cors");

const corsOptions = {
  //allow all origins
  origin: "*",
  //methods to allow
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  //allowed headers
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

const port = process.env.PORT;
const publicurl = process.env.PUBLIC_URL;
const privateurl = process.env.PRIVATE_URL;
const client = new MongoClient(publicurl);
const db = client.db("ecommerce");

//Public & Private API Connections
client.connect().then(() => {
  console.log("Connected Public MongoDB (Browse/Search)");
});
-app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
mongoose
  .connect(privateurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected Private MongoDB (Admin Priv)");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

//important Express stuff
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//creat token funct
const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
//set  custom cookie
app.get("/set-cookie", (req, res) => {
  res.cookie("myCookie", "Hello, this is my cookie!", {
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }); // Expires in 7 days
  res.send("Cookie set successfully!");
});

//admin logout
app.get("/logoutadmin", (req, res) => {
  res.clearCookie("admintoken");
});

//register admin
app.post("/regadmin", async (req, res) => {
  const { Username, Password } = req.body;
  const AdminID = Math.floor(Math.random() * 1000000);
  try {
    const admin = await Admin.create({
      Username,
      AdminID,
      Password,
    });

    res.status(201).json("Admin created successfully");
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//login admin
app.post("/logadmin", async (req, res) => {
  const { Username, Password } = req.body;
  try {
    const admin = await Admin.login(Username, Password);
    const token = createToken(admin, "admin");
    res.status(200).json({ token: token });
  } catch (err) {
    console.log(err);
  }
});

//logout
app.get("/logout", (req, res) => {
  res.clearCookie("admintoken");
});

//register
app.post("/reg", async (req, res) => {
  const { Username, Password, Address, Email, Name, PhoneNumber, Birthdate } =
    req.body;

  const CustomerID = Math.floor(Math.random() * 1000000);
  try {
    const customer = await Customer.create({
      Username,
      CustomerID,
      Password,
      Address,
      Email,
      Name,
      PhoneNumber,
      Birthdate,
    });

    res.status(200).json(customer);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//login
app.post("/log", async (req, res) => {
  const { Username, Password } = req.body;
  console.log('Request body:', req.body);

  try {
    const customer = await Customer.login(Username, Password);
    if (!customer) {
      console.error('Login failed: Customer not found or invalid credentials');
      return res.status(401).json({ error: 'Login failed' });
    }
    const token = createToken(customer, "customer");
    res.status(200).json({ token: token });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//get all customers
app.get("/customers", (req, res) => {
  let users = [];
  db.collection("customers")
    .find()
    .forEach((Name) => users.push(Name))
    .then(() => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: "could not fetch the data" });
    });
});

// find one customer
app.get("/customers/:Username", (req, res) => {
  const customerUsername = req.params.Username;

  db.collection("customers")
    .findOne({ Username: customerUsername })
    .then((customer) => {
      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ error: "Customer not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "An error occurred while fetching data" });
    });
});

//find one products
app.get("/products/:Name", (req, res) => {
  const Name = req.params.Name;

  db.collection("products")
    .findOne({ Name: Name })
    .then((product) => {
      if (product) {
        console.log(product);

        res.status(200).json(product);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "An error occurred while fetching data" });
    });
});

//find all products
app.get("/products", (req, res) => {
  let products = [];
  db.collection("products")
    .find()
    .forEach((product) => products.push(product))
    .then(() => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(500).json({ error: "could not fetch the data" });
    });
});

//insert one product
app.post("/productinsert", requireAuth, (req, res) => {
  const product = req.body;

  db.collection("products")
    .insertOne(product)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Could not be inserted" });
    });
});

//update one product
app.patch("/productedit/:ProductID", requireAuth, (req, res) => {
  const productID = req.params.ProductID;

  const updateFields = req.body;

  db.collection("products")
    .updateOne({ ProductID: productID }, { $set: updateFields })
    .then((result) => {
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Product updated successfully" });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "An error occurred while updating data" });
    });
});

//delete one product
app.delete("/products/:ProductID", requireAuth, (req, res) => {
  const ProductID = req.params.ProductID;

  db.collection("products")
    .deleteOne({ ProductID: ProductID })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Product deleted successfully" });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the product" });
    });
});
