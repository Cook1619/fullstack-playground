import { Request, Response } from 'express';
import * as tasksService from '../services/tasksService'

export const getTasks = (req: Request, res: Response) => {
    const data = tasksService.getTasks()
    console.log('we here')
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