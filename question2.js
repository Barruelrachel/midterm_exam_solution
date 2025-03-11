
const express = require('express'); // Import the Express framework  
const app = express(); // Create an Express application  
const port = 3000; // Define the port number  

// Set up a route 
app.get('/test', (req, res) => {  
    res.json({ message: 'Express is working! Barruel, Rachel' });  
});  

// Start the server 
app.listen(port, () => {  
    console.log(`Server is running on http://localhost:${port}`);  
});
