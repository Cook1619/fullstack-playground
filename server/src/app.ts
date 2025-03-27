import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const PORT = 3000

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Routes
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, world!' })
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})