import {HttpResponse, http} from 'msw'
import {userMockDb} from '../mockDbs/userMockDb'
import {API_BASE_URL, IS_MOCK_ENV} from '../../constants/appConstants'
import type {IUser} from '../../types/IUser'
import type { ITodo } from '../../types/ITodo'
import type {IPaginatedTodosResponse} from '../../types/IPaginatedTodosResponse'
import { todoMockDb } from '../mockDbs/todoMockDb'

const sendResponse = <T>(res: T): HttpResponse<{data: T}> => {
  return HttpResponse.json({data: res})
}

const delayedResponse = async (delay = 1000): Promise<void> => {
  if (IS_MOCK_ENV)
    await new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, delay)
    })
}

export const mswDevHandlers = [
  http.get(`${API_BASE_URL}user`, () => {
    const user = userMockDb.getUser()
    return sendResponse<IUser>(user)
  }),
  http.post(`${API_BASE_URL}todos`, async ({request}) => {
    await delayedResponse()

    const {title} = (await request.json()) as {title: string}
    if (!title || title.trim() === '') {
      return HttpResponse.json({error: 'Title is required'}, {status: 400})
    }

    const newTodo: ITodo = {id: 1, title, status: 'active'}
    return sendResponse(newTodo)
  }),
  http.get(`${API_BASE_URL}todos`, async ({ request }) => {
    const url = new URL(request.url)
    const pageSize = Number(url.searchParams.get('pageSize')) || 10
    const pageNumber = Number(url.searchParams.get('pageNumber')) || 0

    const todos = todoMockDb.getPaginatedTodos(pageNumber, pageSize)
    const total = todoMockDb.getTodos().length
    return sendResponse<IPaginatedTodosResponse>({ items: todos, total })
  }),
  http.get(`${API_BASE_URL}todos/:todoId`, async ({params}) => {
    await delayedResponse()

    const todoId = Number(params.todoId)
    if (isNaN(todoId) || todoId <= 0) {
      return HttpResponse.json({error: 'Invalid todo ID'}, {status: 400})
    }

    const todos = todoMockDb.getTodos()
    const todo = todos.find(t => t.id === todoId)
    if (!todo) {
      return HttpResponse.json({error: 'Todo not found'}, {status: 404})
    }

    return sendResponse(todo)
  }),
]
