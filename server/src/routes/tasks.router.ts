import express from 'express'
import * as taskController from '../controllers/tasks.controller'

const router = express.Router()

router.get('/tasks', taskController.getTasks)

export default router;