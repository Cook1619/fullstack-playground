import express from 'express';
import * as tasksController from '../controllers/tasks.controller';

const router = express.Router();

// Root tasks route
router.get('/', tasksController.getTasks)
router.get('/search', tasksController.searchTasks)
router.get('/:id', tasksController.getTaskById)
router.post('/', tasksController.addTasks)
export default router;