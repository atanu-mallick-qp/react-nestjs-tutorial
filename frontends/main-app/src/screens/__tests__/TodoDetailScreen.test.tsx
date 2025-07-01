import {screen} from '@testing-library/dom'
import '@testing-library/jest-dom'
import {App} from '../../App'
import {testUtil} from '../../tests/testUtil'
import userEvent from '@testing-library/user-event'

describe('TodoDetailScreen', () => {
  test('Todo detail should show title in input and save button', async () => {
    await testUtil.renderWithRoute(<App />, {route: '/todos/1'})

    const titleInput = screen.getByRole('textbox', {name: /title/i})
    expect(titleInput).toBeInTheDocument()
    expect(titleInput).toHaveValue('Learn TypeScript')

    const saveButton = screen.getByRole('button', {name: /save/i})
    expect(saveButton).toBeInTheDocument()
  })
})
