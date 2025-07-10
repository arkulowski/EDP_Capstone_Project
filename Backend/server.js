// Imports
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

// Configurations
dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;

const app = express();
app.use(cors());
const PORT = process.env.PORT;
app.use(express.json());

// MongoDB client setup
let db;
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    db = client.db(dbName);
    console.log(`Connected to database: ${dbName}`);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

  // Route: /
app.get('/', async (req, res) => {
    try {
        res.status(200).send('Server is running');
      } catch (err) {
        console.error('Error in / route:', err);
        res.status(500).send('Server error');
      }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});