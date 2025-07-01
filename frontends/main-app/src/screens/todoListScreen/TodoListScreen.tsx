import {
  WuModal,
  WuModalHeader,
  WuModalContent,
  WuModalFooter,
  WuModalClose,
  WuButton,
  WuPagination,
} from '@npm-questionpro/wick-ui-lib'
import React from 'react'
import type {ITodo} from '../../types/ITodo'
import {Link} from 'react-router'
import type {IPaginatedTodosResponse} from '../../types/IPaginatedTodosResponse'
import {useQuery} from '@tanstack/react-query'

interface IProps {
  userId?: string
}

export const TodoListScreen: React.FC<IProps> = () => {
  const [todos, setTodos] = React.useState<ITodo[]>([])
  const [totalRows, setTotalRows] = React.useState<number>(0)
  // State to manage the title input and modal visibility
  const [title, setTitle] = React.useState<string>('')
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [showError, setShowError] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [pageNumber, setPageNumber] = React.useState<number>(0)
  const [pageSize, setPageSize] = React.useState<number>(10)

  // Fetch initial todos (this could be replaced with an API call)
  const {data, isLoading: isLoadingTodos} = useQuery<IPaginatedTodosResponse>({
    queryKey: ['todos', pageNumber, pageSize],
    queryFn: async () => {
      const response = await fetch(
        `/api/todos?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      return data.data
    },
  })

  React.useEffect(() => {
    if (data) {
      setTodos(data.items)
      setTotalRows(data.total)
    }
  }, [data])

  const handleSave = async (): Promise<void> => {
    if (title.trim() === '') {
      setShowError(true)
      return
    } else {
      setShowError(false)
    }

    setIsLoading(true)
    const newTodo = await callCreateApi(title)
    setIsLoading(false)

    setIsOpen(false)
    setTitle('')
    setTodos(prevTodos => [...prevTodos, newTodo])
  }

  const handleUpdateTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
    if (e.target.value.trim() !== '') {
      setShowError(false)
    }
  }

  function handlePageChange(pageNumber: number): void {
    setPageNumber(pageNumber)
  }

  return (
    <div>
      <h1>Welcome to the Todo App</h1>
      <button onClick={() => setIsOpen(true)}>Create Todo</button>
      <WuPagination
        disabled={totalRows <= pageSize}
        totalRows={totalRows}
        initialPage={0}
        initialPageSize={10}
        onPageChange={page => handlePageChange(page)}
      />
      <div>
        {todos.map((todo, index) => (
          <div key={index}>
            <ul>
              <li>
                <Link to={`/todos/${todo.id}`} style={{textDecoration: 'none'}}>
                  {todo.id} {todo.title}
                </Link>
              </li>
            </ul>
          </div>
        ))}
      </div>
      <WuModal open={isOpen} onOpenChange={setIsOpen}>
        <WuModalHeader>Create Todo</WuModalHeader>
        <WuModalContent>
          <input
            type="text"
            title={title}
            onChange={handleUpdateTitle}
            placeholder="Title"
            aria-label="title"
            required
          />
          {showError && <p style={{color: 'red'}}>Please enter a title</p>}
        </WuModalContent>
        <WuModalFooter>
          <WuModalClose>Close</WuModalClose>
          <WuButton
            loading={isLoading}
            disabled={isLoading}
            onClick={handleSave}
          >
            Save
          </WuButton>
        </WuModalFooter>
      </WuModal>
    </div>
  )
}

const callCreateApi = async (title: string): Promise<ITodo> => {
  const newTodo = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({title}),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => {
      return data.data as ITodo
    })

  return newTodo
}
