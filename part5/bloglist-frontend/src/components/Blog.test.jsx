import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: { username: 'testuser' }
  }

  test('renders title and author, but not URL or likes by default', () => {
    render(<Blog blog={blog} user={{ username: 'testuser' }} />)

    // Check if title and author are rendered
    expect(screen.getByText('Test Blog Title')).toBeInTheDocument()
    expect(screen.getByText('Test Author')).toBeInTheDocument()

    // Check if URL and likes are not rendered
    expect(screen.queryByText('http://testurl.com')).not.toBeInTheDocument()
    expect(screen.queryByText('likes: 5')).not.toBeInTheDocument()
  })

  test('shows URL and likes when the button is clicked', async () => {
    render(<Blog blog={blog} user={{ username: 'testuser' }} />)

    // Set up user event
    const user = userEvent.setup()

    // Click the button to show details
    const button = screen.getByText('view')
    await user.click(button)

    // Check if URL and likes are now rendered
    expect(screen.getByText('http://testurl.com')).toBeInTheDocument()
    expect(screen.getByText('likes: 5')).toBeInTheDocument()
  })

  test('calls event handler twice when like button is clicked twice', async () => {
    const mockHandler = vi.fn() // Create a mock function for the like handler

    render(<Blog blog={blog} user={{ username: 'testuser' }} handleLike={mockHandler} />)

    // Set up user event
    const user = userEvent.setup()

    // Click the button to show details
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    // Now click the like button twice
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    // Check if the mock handler was called twice
    expect(mockHandler).toHaveBeenCalledTimes(2)
  })

  
})
