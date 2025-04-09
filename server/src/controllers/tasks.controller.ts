import { Request, Response } from 'express'
import * as tasksService from '../services/tasksService'


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


export const getTasks = (req: Request, res: Response) => {
    const data = tasksService.getTasks()
    res.send(data)
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

export const searchTasks = (req: Request, res: Response) => {
    const { name, completed, inProgress } = req.query

    const filteredTasks = tasksService.searchTasks({
        name: name as string,
        completed: completed as string,
        inProgress: inProgress as string,
    })

    res.send(filteredTasks)
}