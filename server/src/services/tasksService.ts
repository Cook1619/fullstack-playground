import { Task, tasksModel }  from '../models/tasks.model'
import { nameIndex, completedIndex, inProgressIndex, rebuildIndexes } from './tasksIndex'

export const addTask = (newTask: Task) => {
    tasksModel.push(newTask)
    rebuildIndexes() // Rebuild indexes to include the new task
}

export const getTasks = () => {
    return tasksModel
}

export const getTask = (id: string) => {
    return tasksModel.find((task) => +task.id === +id)
}

export const searchTasks = (query: { name?: string, completed?: string, inProgress?: string }): Task[] => {
    let results: Task[] = Object.values(nameIndex).flat()

    // Filter by name using the name index
    if (query.name) {
        const nameKey = query.name.toLowerCase()
        results = nameIndex[nameKey] || []
    }

    // Filter by completed status using the completed index
    if (query.completed) {
        const completedKey = query.completed === 'true' ? 'true' : 'false'
        results = results.filter((task) => completedIndex[completedKey].includes(task))
    }

    // Filter by inProgress status using the inProgress index
    if (query.inProgress) {
        const inProgressKey = query.inProgress === 'true' ? 'true' : 'false'
        results = results.filter((task) => inProgressIndex[inProgressKey].includes(task))
    }

    return results
}