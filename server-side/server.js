const express = require('express');
const axios = require('axios');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: 'users'
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Fetch users from the API and store selected information in the database
app.get('/fetch-users', async (req, res) => {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=50');
      const users = response.data.results;
  
      for (const user of users) {
        const { gender, name, location, picture  } = user;
        const { street, city, state, country ,postcode } = location;
  
        const insertQuery = `
          INSERT INTO random_users (
            gender, first_name, last_name, street_number, street_name, city, state, country,postcode, picture_large, picture_medium, picture_thumbnail
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
  
        const values = [
          gender,
          name.first,
          name.last,
          street.number,
          street.name,
          city,
          state,
          country,
          postcode,
          picture.large,
          picture.medium,
          picture.thumbnail
        ];
  
        await db.promise().query(insertQuery, values);
      }
  
      res.status(200).json({ message: 'Users fetched and stored successfully.' });
    } catch (error) {
      console.error('An error occurred while fetching and storing users:', error);
      res.status(500).json({ error: 'An error occurred while fetching and storing users.' });
    }
  });
 
// Retrieve all data from the database
app.get('/get-all-users', async (req, res) => {
    try {
      const [rows] = await db.promise().query('SELECT * FROM random_users');
      res.status(200).json(rows);
    } catch (error) {
      console.error('An error occurred while retrieving users:', error);
      res.status(500).json({ error: 'An error occurred while retrieving users.' });
    }
  });

// Delete all users from the database
app.delete('/delete-all-users', async (req, res) => {
    try {
      await db.promise().query('DELETE FROM random_users');
      res.status(200).json({ message: 'All users deleted successfully.' });
    } catch (error) {
      console.error('An error occurred while deleting users:', error);
      res.status(500).json({ error: 'An error occurred while deleting users.' });
    }
  });
  

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
