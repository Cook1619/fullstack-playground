import { Task, tasksModel } from '../models/tasks.model'

const nameIndex: Record<string, Task[]> = {}
const completedIndex: Record<string, Task[]> = { true: [], false: [] }
const inProgressIndex: Record<string, Task[]> = { true: [], false: [] }

// Preprocess the data into indexes
export const buildIndexes = () => {
    tasksModel.forEach((task) => {
        // Index by name (case-insensitive)
        const nameKey = task.name.toLowerCase()
        if (!nameIndex[nameKey]) {
            nameIndex[nameKey] = []
        }
        nameIndex[nameKey].push(task)

        // Index by completed status
        completedIndex[task.completed.toString()].push(task)

        // Index by inProgress status
        inProgressIndex[task.inProgress.toString()].push(task)
    })
}

// Function to rebuild indexes when data changes
export const rebuildIndexes = () => {
    // Clear existing indexes
    Object.keys(nameIndex).forEach((key) => delete nameIndex[key])
    completedIndex.true = []
    completedIndex.false = []
    inProgressIndex.true = []
    inProgressIndex.false = []

    // Rebuild indexes
    buildIndexes()
}

// Initialize indexes when the module is loaded
buildIndexes()

export { nameIndex, completedIndex, inProgressIndex }