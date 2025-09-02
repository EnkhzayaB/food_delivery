// Script to create the first admin user
// Run this once: node create-admin.js

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// User model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please add an email"],
    unique: true,
  },
  password: { type: String, required: [true, "please write an password"] },
  phoneNumber: Number,
  address: String,
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  isVerified: { type: Boolean, default: false },
  createdAt: Date,
  updatedAt: Date,
});

const User = mongoose.model("User", userSchema);

async function createFirstAdmin() {
  try {
    // Connect to MongoDB
    const mongoUrl =
      process.env.MONGO_URL || "mongodb://localhost:27017/food_delivery";
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "ADMIN" });
    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin.email);
      process.exit(0);
    }

    // Create first admin
    const adminEmail = "admin@nomnom.com";
    const adminPassword = "admin123456"; // Change this to a secure password

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    const admin = await User.create({
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("First admin user created successfully!");
    console.log("Email:", adminEmail);
    console.log("Password:", adminPassword);
    console.log("Please change the password after first login!");
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    await mongoose.disconnect();
  }
}

createFirstAdmin();
