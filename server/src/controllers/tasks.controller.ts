import { Request, Response } from 'express'
import * as tasksService from '../services/tasksService'
import redisClient from '../redisClient'


export const addTasks = (req: Request, res: Response) => {
    const { name, completed, inProgress } = req.body

    // Validate the request body
    if (!name || typeof completed !== 'boolean' || typeof inProgress !== 'boolean') {
        return res.status(400).send({ message: 'Invalid task data. Please provide name, completed, and inProgress fields.' })
    }

    // Create a new task object
    const newTask = {
        id: Date.now(), // Generate a unique ID (you can replace this with a better ID generator if needed)
        name,
        completed,
        inProgress,
    }

    // Add the task using the service
    tasksService.addTask(newTask)

    // Return the newly created task
    res.status(201).send(newTask)
}


export const getTasks = async (req: Request, res: Response) => {
    const cacheKey = 'tasks:getAll'

    // Check if data exists in Redis cache
    const cachedData = await redisClient.get(cacheKey)
    if (cachedData) {
        console.log('Cache hit for getTasks')
        return res.json(JSON.parse(cachedData))
    }

    // Fetch tasks from the service
    const data = tasksService.getTasks()

    // Store the result in Redis cache with a 60-second expiration
    await redisClient.set(cacheKey, JSON.stringify(data), { EX: 60 })

    console.log('Cache miss for getTasks')
    res.json(data)
}


export const getTaskById = (req: Request, res: Response) => {
    const { id } = req.params
    const task = tasksService.getTask(id)

    if (task) {
        res.send(task)
    } else {
        res.status(404).send({ message: `Task with ID ${id} not found` })
    }
}

export const searchTasks = async (req: Request, res: Response) => {
    const { name, completed, inProgress } = req.query

    // Create a unique cache key based on query parameters
    const cacheKey = `tasks:search:${name || ''}:${completed || ''}:${inProgress || ''}`

    // Check if data exists in Redis cache
    const cachedData = await redisClient.get(cacheKey)
    if (cachedData) {
        console.log('Cache hit for searchTasks')
        return res.json(JSON.parse(cachedData))
    }

    // Fetch filtered tasks from the service
    const filteredTasks = tasksService.searchTasks({
        name: name as string,
        completed: completed as string,
        inProgress: inProgress as string,
    })

    // Store the result in Redis cache with a 60-second expiration
    await redisClient.set(cacheKey, JSON.stringify(filteredTasks), { EX: 60 })

    console.log('Cache miss for searchTasks')
    res.json(filteredTasks)
}