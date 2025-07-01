import {useParams} from 'react-router'
import {useState, useEffect} from 'react'

const useTodoIdFromParams = () => {
  // Implement using useParams from 'react-router-dom'
  const {todoId} = useParams<{todoId: string}>()
  //validate the id
  if (!todoId || isNaN(Number(todoId))) {
    throw new Error('Invalid todo ID')
  }
  const id = Number(todoId)
  // Optionally, you can add further validation or transformation here
  if (id <= 0) {
    throw new Error('Todo ID must be a positive number')
  }
  return id
}

export const TodoDetailScreen = () => {
  const todoId = useTodoIdFromParams()
  const [todo, setTodo] = useState<{title: string}>({title: ''})

  useEffect(() => {
    const fetchTodo = async () => {
      const response = await fetch('/api/todos/' + todoId)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setTodo(data)
    }

    fetchTodo().catch(error => {
      console.error('Error fetching todos:', error)
    })
  }, [todoId])

  return (
    <div>
      <input
        title="title"
        type="text"
        placeholder="Title"
        value={todo.title}
        onChange={e => setTodo({...todo, title: e.target.value})}
      />
      <input type="button" value="Save" />
    </div>
  )
}
