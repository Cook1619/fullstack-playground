import { Request, Response } from 'express'
import * as tasksController from '../../src/controllers/tasks.controller'
import * as tasksService from '../../src/services/tasksService'

jest.mock('../../src/services/tasksService') // Mock the service

describe('Tasks Controller', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let jsonMock: jest.Mock

  beforeEach(() => {
    jsonMock = jest.fn()
    mockRequest = {}
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jsonMock,
    }
  })

  describe('getTasks', () => {
    it('should return all tasks', () => {
      const mockTasks = [
        { id: 1, name: 'Task 1', completed: false, inProgress: true },
      ]
      jest.spyOn(tasksService, 'getTasks').mockReturnValue(mockTasks)

      tasksController.getTasks(mockRequest as Request, mockResponse as Response)

      expect(tasksService.getTasks).toHaveBeenCalled()
      expect(jsonMock).toHaveBeenCalledWith(mockTasks)
    })
  })

  describe('getTaskById', () => {
    it('should return a task if found', () => {
      const mockTask = {
        id: 1,
        name: 'Task 1',
        completed: false,
        inProgress: true,
      }
      jest.spyOn(tasksService, 'getTask').mockReturnValue(mockTask)

      mockRequest.params = { id: '1' }

      tasksController.getTaskById(mockRequest as Request, mockResponse as Response)

      expect(tasksService.getTask).toHaveBeenCalledWith('1')
      expect(jsonMock).toHaveBeenCalledWith(mockTask)
    })

    it('should return 404 if task is not found', () => {
      jest.spyOn(tasksService, 'getTask').mockReturnValue(undefined)

      mockRequest.params = { id: '999' }

      tasksController.getTaskById(mockRequest as Request, mockResponse as Response)

      expect(tasksService.getTask).toHaveBeenCalledWith('999')
      expect(mockResponse.status).toHaveBeenCalledWith(404)
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Task with ID 999 not found' })
    })
  })

  describe('searchTasks', () => {
    it('should return filtered tasks', () => {
      const mockFilteredTasks = [
        { id: 1, name: 'Task 1', completed: false, inProgress: true },
      ]
      jest.spyOn(tasksService, 'searchTasks').mockReturnValue(mockFilteredTasks)

      mockRequest.query = { name: 'Task' }

      tasksController.searchTasks(mockRequest as Request, mockResponse as Response)

      expect(tasksService.searchTasks).toHaveBeenCalledWith({
        name: 'Task',
        completed: undefined,
        inProgress: undefined,
      })
      expect(jsonMock).toHaveBeenCalledWith(mockFilteredTasks)
    })
  })
})