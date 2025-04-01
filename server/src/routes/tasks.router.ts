import express from 'express'
import * as taskController from '../controllers/tasks.controller'

const router = express.Router()

// root tasks route
router.get('/', taskController.getTasks)
router.get('/:id', taskController.getTaskById)

export default router;