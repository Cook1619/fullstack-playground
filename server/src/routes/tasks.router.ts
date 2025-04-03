import express from 'express'
import * as tasksController from '../controllers/tasks.controller'

const router = express.Router()

// root tasks route
router.get('/', tasksController.getTasks)
router.get('/search', tasksController.searchTasks)
router.get('/:id', tasksController.getTaskById)

export default router;