// config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbURI = process.env.DB;  // Replace with your MongoDB URI
    await mongoose.connect(dbURI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
