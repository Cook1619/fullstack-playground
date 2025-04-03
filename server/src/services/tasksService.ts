import { Task, tasksModel }  from '../models/tasks.model'

export const getTasks = () => {
    return tasksModel;
}

export const getTask = (id: string) => {
    return tasksModel.find((task) => +task.id === +id)
}

export const searchTasks = (query: { name?: string; completed?: string; inProgress?: string }): Task[] => {
    return tasksModel.filter((task) => {
        const matchesName = query.name ? task.name.toLowerCase().includes(query.name.toLowerCase()) : true
        const matchesCompleted = query.completed ? task.completed === (query.completed === 'true') : true
        const matchesInProgress = query.inProgress ? task.inProgress === (query.inProgress === 'true') : true

        return matchesName && matchesCompleted && matchesInProgress
    })
}