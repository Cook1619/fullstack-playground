import { Request, Response } from 'express';
import { Task }  from '../models/tasks.model'
import * as tasksService from '../services/tasksService'

function getTasks(req: Request, res: Response) {
    const data = tasksService.getTasks()
    res.send(data)
}

