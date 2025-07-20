const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/products");
dotenv.config();

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to send data
const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // create a default admin User
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    // Assign the default user ID to each product
    const userID = createdUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user:userID };
    });

    // Insert the products into the database
    await Product.insertMany(sampleProducts);

    console.log("Products data saved successfully");
    process.exit();
  } catch (error) {
    console.error("error seeding the data ", error);
    process.exit(1);
  }
};

seedData();

// // rabbit-backend-seeder.js
// require("dotenv").config();
// const connectDB = require("../backend/config/db");
// const mongoose = require("mongoose");
// const Product = require("./models/Product"); // Adjust the path if needed

// // Replace with your actual MongoDB connection string
// // const MONGO_URI = "mongodb://127.0.0.1:27017/yourdbname"; // or from .env

// const seedColorsName = async () => {
//   try {
//     await connectDB(); // Connect to MongoDB using your reusable function

//     const result = await Product.updateMany(
//       { colorsName: { $exists: false } },
//       { $set: { colorsName: [] } } // or you can populate based on logic
//     );

//     console.log(`✅ Updated ${result.modifiedCount} products`);
//   } catch (error) {
//     console.error("❌ Seeding error:", error);
//   } finally {
//     await mongoose.disconnect();
//     console.log("🔌 MongoDB disconnected");
//     process.exit(0);
//   }
// };

// seedColorsName();
