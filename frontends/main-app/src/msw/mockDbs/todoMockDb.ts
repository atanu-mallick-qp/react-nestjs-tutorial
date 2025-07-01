import type {ITodo} from '../../types/ITodo'

export const todoMockDb = {
  getTodos: (): ITodo[] => {
    return [
      {id: 1, title: 'Learn TypeScript', status: 'active'},
      {id: 2, title: 'Build a mock server', status: 'completed'},
      { id: 3, title: 'Test the application', status: 'active' },
      { id: 4, title: 'Deploy to production', status: 'completed' },
      { id: 5, title: 'Write documentation', status: 'active' },
      { id: 6, title: 'Refactor code', status: 'completed' },
      { id: 7, title: 'Fix bugs', status: 'active' },
      { id: 8, title: 'Review pull requests', status: 'completed' },
      { id: 9, title: 'Attend team meetings', status: 'active' },
      { id: 10, title: 'Plan next sprint', status: 'completed' },
      { id: 11, title: 'Conduct code reviews', status: 'active' },
      { id: 12, title: 'Update dependencies', status: 'completed' },
      { id: 13, title: 'Optimize performance', status: 'active' },
      { id: 14, title: 'Implement new features', status: 'completed' },
      { id: 15, title: 'Conduct user testing', status: 'active' },
      { id: 16, title: 'Gather feedback', status: 'completed' },
      { id: 17, title: 'Prepare release notes', status: 'active' },
      { id: 18, title: 'Monitor application health', status: 'completed' },
      { id: 19, title: 'Plan future enhancements', status: 'active' },
      { id: 20, title: 'Conduct retrospectives', status: 'completed' },
      { id: 21, title: 'Improve CI/CD pipeline', status: 'active' },
      { id: 22, title: 'Enhance security measures', status: 'completed' },
      { id: 23, title: 'Conduct training sessions', status: 'active' },
      { id: 24, title: 'Collaborate with stakeholders', status: 'completed' },
      { id: 25, title: 'Document API endpoints', status: 'active' },
      { id: 26, title: 'Create user guides', status: 'completed' },
      { id: 27, title: 'Set up monitoring tools', status: 'active' },
      { id: 28, title: 'Conduct performance testing', status: 'completed' },
      { id: 29, title: 'Implement logging strategies', status: 'active' },
      { id: 30, title: 'Review system architecture', status: 'completed' }
    ]
  },

  getPaginatedTodos: (page: number, pageSize: number): ITodo[] => {
    const todos = todoMockDb.getTodos()
    const startIndex = (page) * pageSize
    const endIndex = startIndex + pageSize
    return todos.slice(startIndex, endIndex)
  }
}
