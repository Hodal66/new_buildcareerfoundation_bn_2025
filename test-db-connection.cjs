require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.DATABASE_CONNECTION_STRING;

if (!uri) {
    console.error("Error: DATABASE_CONNECTION_STRING is missing or empty in .env");
    process.exit(1);
}

console.log("Attempting to connect to MongoDB...");

mongoose.connect(uri)
    .then(() => {
        console.log("✅ Database connection successful!");
        process.exit(0);
    })
    .catch(err => {
        console.error("❌ Database connection failed:");
        console.error(err.message);
        process.exit(1);
    });
