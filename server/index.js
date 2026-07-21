import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getTasks, saveTasks } from './utils/file.js';

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Return all tasks
app.get('/tasks', async (req, res) => {
  const tasks = await getTasks();
  console.log('Fetched tasks:', tasks);
  res.status(200).json(tasks);
});


// Adds a new task
app.post('/tasks', async (req, res) => {
    const { title, description } = req.body;
    const newTask = { id: Date.now().toString(), title, description, completed: false };
    const tasks = await getTasks();
    tasks.push(newTask);
    await saveTasks(tasks);
    res.status(201).json(newTask);
});

// Updates an existing task
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const tasks = await getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    tasks[taskIndex] = { ...tasks[taskIndex], title, description, completed };
    await saveTasks(tasks);
    res.status(200).json(tasks[taskIndex]);
});

// Deletes a task
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const tasks = await getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    await saveTasks(tasks);
    res.status(200).json({ message: 'Task deleted successfully' });
});

//Searches the tasks
app.get('/search', async (req, res) => {
    const search = req.query.search;

    const tasks = await getTasks();

    const filteredTasks = tasks.filter(task => {
        return task.title.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase());
    });
    
    res.status(200).json(filteredTasks);
})

// Toggles the completion status of a task
app.patch('/tasks/:id/toggle', async (req, res) => {
    const { id } = req.params;
    const tasks = await getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    await saveTasks(tasks);
    res.status(200).json(tasks[taskIndex]);
});

// Returns tasks based on their completion status
app.get('tasks/query', async (req, res) => {
    const { status } = req.query;
    const tasks = await getTasks();
    let filteredTasks;
    if (status === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (status === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (status === 'in-progress') {
        filteredTasks = tasks.filter(task => task.completed === false && task.description.length > 0);
    } else {
        return res.status(400).json({ message: 'Invalid status query parameter' });
    }
    res.status(200).json(filteredTasks);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
