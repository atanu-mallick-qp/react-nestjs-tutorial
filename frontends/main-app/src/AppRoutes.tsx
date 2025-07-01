import {Navigate, Route, Routes} from 'react-router'
import {TodoListScreen} from './screens/todoListScreen/TodoListScreen.tsx'
import {TodoDetailScreen} from './screens/todoDetailScreen/TodoDetailScreen.tsx'

export const AppRoutes: React.FC<React.PropsWithChildren> = () => {
  return (
    <Routes>
      <Route path="/todos" element={<TodoListScreen />} />
      // Add route to accept todo id as a parameter
      <Route path="/todos/:todoId" element={<TodoDetailScreen />} />
      <Route path="*" element={<Navigate to="/todos" replace />} />
    </Routes>
  )
}
