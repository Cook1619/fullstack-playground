import { buildIndexes, rebuildIndexes, nameIndex, completedIndex, inProgressIndex } from '../../src/services/tasksIndex'
import { tasksModel } from '../../src/models/tasks.model'

describe('tasksIndex', () => {
    beforeEach(() => {
        // Reset the tasksModel to a known state before each test
        tasksModel.length = 0
        tasksModel.push(
            { id: 1, name: 'Task One', completed: false, inProgress: true },
            { id: 2, name: 'Task Two', completed: true, inProgress: false },
            { id: 3, name: 'Task Three', completed: false, inProgress: true },
            { id: 4, name: 'Task One', completed: true, inProgress: false }
        )

        // Rebuild indexes before each test
        rebuildIndexes()
    })

    it('should build nameIndex correctly', () => {
        expect(nameIndex['task one']).toHaveLength(2)
        expect(nameIndex['task one']).toEqual([
            { id: 1, name: 'Task One', completed: false, inProgress: true },
            { id: 4, name: 'Task One', completed: true, inProgress: false },
        ])

        expect(nameIndex['task two']).toHaveLength(1)
        expect(nameIndex['task two']).toEqual([
            { id: 2, name: 'Task Two', completed: true, inProgress: false },
        ])

        expect(nameIndex['task three']).toHaveLength(1)
        expect(nameIndex['task three']).toEqual([
            { id: 3, name: 'Task Three', completed: false, inProgress: true },
        ])
    })

    it('should build completedIndex correctly', () => {
        expect(completedIndex['true']).toHaveLength(2)
        expect(completedIndex['true']).toEqual([
            { id: 2, name: 'Task Two', completed: true, inProgress: false },
            { id: 4, name: 'Task One', completed: true, inProgress: false },
        ])

        expect(completedIndex['false']).toHaveLength(2)
        expect(completedIndex['false']).toEqual([
            { id: 1, name: 'Task One', completed: false, inProgress: true },
            { id: 3, name: 'Task Three', completed: false, inProgress: true },
        ])
    })

    it('should build inProgressIndex correctly', () => {
        expect(inProgressIndex['true']).toHaveLength(2)
        expect(inProgressIndex['true']).toEqual([
            { id: 1, name: 'Task One', completed: false, inProgress: true },
            { id: 3, name: 'Task Three', completed: false, inProgress: true },
        ])

        expect(inProgressIndex['false']).toHaveLength(2)
        expect(inProgressIndex['false']).toEqual([
            { id: 2, name: 'Task Two', completed: true, inProgress: false },
            { id: 4, name: 'Task One', completed: true, inProgress: false },
        ])
    })

    it('should rebuild indexes correctly when data changes', () => {
        // Modify tasksModel
        tasksModel.push({ id: 5, name: 'Task Four', completed: true, inProgress: true })

        // Rebuild indexes
        rebuildIndexes()

        // Verify nameIndex
        expect(nameIndex['task four']).toHaveLength(1)
        expect(nameIndex['task four']).toEqual([
            { id: 5, name: 'Task Four', completed: true, inProgress: true },
        ])

        // Verify completedIndex
        expect(completedIndex['true']).toHaveLength(3)
        expect(completedIndex['true']).toEqual([
            { id: 2, name: 'Task Two', completed: true, inProgress: false },
            { id: 4, name: 'Task One', completed: true, inProgress: false },
            { id: 5, name: 'Task Four', completed: true, inProgress: true },
        ])

        // Verify inProgressIndex
        expect(inProgressIndex['true']).toHaveLength(3)
        expect(inProgressIndex['true']).toEqual([
            { id: 1, name: 'Task One', completed: false, inProgress: true },
            { id: 3, name: 'Task Three', completed: false, inProgress: true },
            { id: 5, name: 'Task Four', completed: true, inProgress: true },
        ])
    })
})