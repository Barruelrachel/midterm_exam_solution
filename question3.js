const express = require('express'); // Import Express
const app = express(); // Initialize the app
const port = 3000; // Define the port

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory array to store tasks (simulating a database)
let tasks = [
    { id: 1, name: 'Task 1', description: 'This is task 1' },
    { id: 2, name: 'Task 2', description: 'This is task 2' }
];

// Create - Add a new task
app.post('/tasks', (req, res) => {
    const { name, description } = req.body; // Get data from the request body
    const newTask = { id: tasks.length + 1, name, description }; // Create a new task with a unique id
    tasks.push(newTask); // Add the new task to the tasks array
    res.status(201).json(newTask); // Send back the created task
});

// Read - Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks); // Return the list of tasks
});

// Update - Update an existing task by ID
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id); // Get task id from the URL
    const { name, description } = req.body; // Get updated data from the body
    const taskIndex = tasks.findIndex(task => task.id === taskId); // Find the task by ID

    if (taskIndex !== -1) {
        // If task exists, update the task
        tasks[taskIndex] = { id: taskId, name, description };
        res.json(tasks[taskIndex]); // Send back the updated task
    } else {
        res.status(404).json({ message: 'Task not found' }); // Task not found
    }
});

// Delete - Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id); // Get task id from the URL
    const taskIndex = tasks.findIndex(task => task.id === taskId); // Find the task by ID

    if (taskIndex !== -1) {
        // If task exists, delete it
        const deletedTask = tasks.splice(taskIndex, 1);
        res.json(deletedTask); // Send back the deleted task
    } else {
        res.status(404).json({ message: 'Task not found' }); // Task not found
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
