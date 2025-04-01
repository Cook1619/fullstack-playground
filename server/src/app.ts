import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import tasksRoutes from './routes/tasks.router'

const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(bodyParser.json())

const getRandomString = () => Math.random().toString(36).substring(2, 8);

// Routes
app.get('/api/random', (req, res) => {
    const result = Array.from({ length: 40 }, (_, i) => {
        if ((i + 1) % 15 === 0) return 'FizzBuzz';
        if ((i + 1) % 3 === 0) return 'Fizz';
        if ((i + 1) % 5 === 0) return 'Buzz';
        return getRandomString();
    });
    res.json(result);
});

app.use('/tasks')

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})