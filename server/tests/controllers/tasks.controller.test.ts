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

  describe('addTasks', () => {
    it('should add a task and return 201 with the new task', () => {
      const mockTask = {
        id: 1234567890,
        name: 'New Task',
        completed: false,
        inProgress: true,
      }

      // Mock Date.now() to return a fixed value
      jest.spyOn(global.Date, 'now').mockReturnValue(mockTask.id)

      // Mock request body
      mockRequest.body = {
        name: 'New Task',
        completed: false,
        inProgress: true,
      }

      // Call the controller
      tasksController.addTasks(mockRequest as Request, mockResponse as Response)

      // Assertions
      expect(tasksService.addTask).toHaveBeenCalledWith(mockTask)
      expect(mockResponse.status).toHaveBeenCalledWith(201)
      expect(jsonMock).toHaveBeenCalledWith(mockTask)

      // Restore Date.now()
      jest.spyOn(global.Date, 'now').mockRestore()
    })

    it('should return 400 if the request body is invalid', () => {
      // Mock invalid request body
      mockRequest.body = {
        name: '', // Invalid name
        completed: 'not-a-boolean', // Invalid completed
        inProgress: true,
      }

      // Call the controller
      tasksController.addTasks(mockRequest as Request, mockResponse as Response)

      // Assertions
      expect(tasksService.addTask).not.toHaveBeenCalled()
      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(jsonMock).toHaveBeenCalledWith({
        message: 'Invalid task data. Please provide name, completed, and inProgress fields.',
      })
    })
  })
})