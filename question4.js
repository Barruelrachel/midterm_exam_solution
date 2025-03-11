// Import required modules
const express = require('express'); // Express web framework
const { Sequelize, DataTypes } = require('sequelize'); // Sequelize for ORM
const app = express();
const port = 3000;

// Set up Sequelize connection to MySQL
// Replace 'your_database_name', 'your_username', 'your_password' with actual MySQL details
const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
  host: 'localhost', // MySQL server location
  dialect: 'mysql', // Dialect to use for Sequelize (MySQL in this case)
  logging: false // Disable logging for cleaner output
});

// Test connection to the database
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Define Sequelize model for the "users" table
// The model represents the structure of the "users" table
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // The 'id' field will be the primary key
    autoIncrement: true, // Automatically increment the 'id' value
  },
  name: {
    type: DataTypes.STRING, // 'name' field will store a string (name of the user)
    allowNull: false, // 'name' cannot be null
  },
  email: {
    type: DataTypes.STRING,
    unique: true, // 'email' must be unique for each user
    allowNull: false, // 'email' cannot be null
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active', // Default value for 'status' is 'active'
  },
}, {
  tableName: 'users', // Explicitly specify the table name if different
  timestamps: false, // Disable automatic timestamp fields (createdAt, updatedAt)
});

// Define a route to fetch all users
app.get('/users', async (req, res) => {
  try {
    // Fetch all users from the database using Sequelize's findAll method
    const users = await User.findAll();

    // Send the fetched users as a JSON response
    res.json(users);
  } catch (error) {
    // Handle errors and send a 500 response in case of failure
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

// Sync the model with the database (this creates the table if it doesn't exist)
sequelize.sync()
  .then(() => {
    // Start the server after syncing the model
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing the database:', error);
  });
