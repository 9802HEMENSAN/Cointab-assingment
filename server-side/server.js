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
        const { street, city, state, country, coordinates  } = location;
  
        const insertQuery = `
          INSERT INTO random_users (
            gender, title, first_name, last_name, street_number, street_name, city, state, country, postcode,
            latitude, longitude, timezone_offset, timezone_description, email, username, password, salt, md5, sha1,
            sha256, dob_date, dob_age, registered_date, registered_age, phone, cell, nino_name, nino_value,
            picture_large, picture_medium, picture_thumbnail, nat
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
  
        const values = [
          gender, name.title, name.first, name.last, street.number, street.name, city, state, country,
          location.postcode,  coordinates.latitude, coordinates.longitude, location.timezone.offset,
          location.timezone.description, user.email, user.login.username, user.login.password, user.login.salt,
          user.login.md5, user.login.sha1, user.login.sha256, new Date(user.dob.date), user.dob.age,
          new Date(user.registered.date), user.registered.age, user.phone, user.cell, user.id.name,
          user.id.value, picture.large, picture.medium, picture.thumbnail, user.nat
        ];
  
        db.query(insertQuery, values);
      }
  
      res.status(200).json({ message: 'Users fetched and stored successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching and storing users.' });
    }
  });

// Retrieve all data from the database
app.get('/get-all-users', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;  // Get the page number from query parameter, default to page 1
        const limit = parseInt(req.query.limit) || 10; // Get the limit (items per page) from query parameter, default to 10
        const gender = req.query.gender; // Get the gender filter from query parameter
        const startIndex = (page - 1) * limit;
        
        // const query = 'SELECT * FROM random_users LIMIT ? OFFSET ?';
        let query = 'SELECT * FROM random_users';
        let queryParams = [];
        
        if (gender) {
            query += ' WHERE gender = ?';
            queryParams.push(gender);
        }

        query += ' LIMIT ? OFFSET ?';
        queryParams.push(limit, startIndex);
  
      const [rows] = await db.promise().query( query ,  queryParams );
      res.status(200).json(rows);
    } catch (error) {
 
      res.status(500).json({ error: 'An error occurred while retrieving users.' });
    }
  });

// Delete all users from the database
app.delete('/delete-all-users', async (req, res) => {
    try {
      await db.promise().query('DELETE FROM random_users');
      res.status(200).json({ message: 'All users deleted successfully.', status : "OK" });
    } catch (error) {
  
      res.status(500).json({ error: 'An error occurred while deleting users.' });
    }
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
