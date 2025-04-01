import { tasksModel }  from '../models/tasks.model'

export const getTasks = () => {
    return tasksModel;
}

export const getTask = (id: string) => {
    return tasksModel.find((task) => +task.id === +id)
}