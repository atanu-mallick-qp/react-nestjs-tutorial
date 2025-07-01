import {screen} from '@testing-library/dom'
import '@testing-library/jest-dom'
import {App} from '../../App'
import {testUtil} from '../../tests/testUtil'
import userEvent from '@testing-library/user-event'

describe('TodoListScreen', () => {
  test('Initially a user should see welcome screen with create todo button', async () => {
    await testUtil.renderWithRoute(<App />, {route: '/todos'})

    screen.getByText('Welcome to the Todo App')
  })

  test('Initially a user should see welcome screen with create todo button', async () => {
    await testUtil.renderWithRoute(<App />, {route: '/todos'})

    screen.getByText('Welcome to the Todo App')
    // Check for the create todo button
    const createTodoButton = screen.getByRole('button', {name: /create todo/i})

    await userEvent.click(createTodoButton)

    // Check for the modal dialog
    screen.getByRole('dialog')

    const titleBox = screen.getByRole('textbox', {name: /title/i})
    const saveButton = screen.getByRole('button', {name: /save/i})

    await userEvent.click(saveButton)

    // Check for error message when title is not provided

    screen.getByText('Please enter a title')

    await userEvent.type(titleBox, 'Test Todo')
    expect(screen.queryByText('Please enter a title')).toBeNull()

    await userEvent.click(saveButton)

    await screen.findByText(/Test Todo/i)
  })
})

test('User should be able to see the list of todos', async () => {
  await testUtil.renderWithRoute(<App />, {route: '/todos'})

  screen.getByText('Welcome to the Todo App')
  // Check for list of todos in li tag
  const todoListItems = screen.getAllByRole('listitem')
  expect(todoListItems.length).toBeGreaterThan(0)
  todoListItems.forEach(item => {
    expect(item).toBeInTheDocument()
  })
})
