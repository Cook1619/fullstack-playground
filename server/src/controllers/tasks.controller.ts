const model = require('../models/tasks.model')
import { Task, tasksModel }  from '../models/tasks.model'

function getTask(req, res) {
    const taskId = Number(req.params.taskId)
    const task: Task = model[taskId]
}