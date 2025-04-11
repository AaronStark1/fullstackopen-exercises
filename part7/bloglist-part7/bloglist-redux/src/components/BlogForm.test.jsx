import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls createBlog with the right details when a new blog is created', async () => {
    const createBlog = vi.fn() // Create a mock function for the createBlog handler

    render(<BlogForm createBlog={createBlog} />)

    // Set up user event
    const user = userEvent.setup()

    // Fill in the form fields
    await user.type(screen.getByPlaceholderText('Title'), 'Test Blog Title')
    await user.type(screen.getByPlaceholderText('Author'), 'Test Author')
    await user.type(screen.getByPlaceholderText('Url'), 'http://testurl.com')

    // Submit the form
    await user.click(screen.getByText('create'))

    // Check if createBlog was called with the right details
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'http://testurl.com',
    })
  })
})
