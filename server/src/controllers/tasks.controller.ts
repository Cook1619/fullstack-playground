import { Request, Response } from 'express';
import { Task }  from '../models/tasks.model'
import * as tasksService from '../services/tasksService'

export const getTasks = (req: Request, res: Response) => {
    const data = tasksService.getTasks()
    console.log('we here')
    res.send(data)
}

