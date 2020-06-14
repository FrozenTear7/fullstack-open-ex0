import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const user = {
    id: 'user123',
    token: 'Bearer 123123',
    username: 'test username',
    name: 'test name',
  }

  const blog = {
    id: '123',
    title: 'test',
    author: 'test author',
    url: 'test url',
    likes: 123,
    user: {
      id: user.id,
    },
  }

  const mockLikeBlog = jest.fn()
  const mockDeleteBlog = jest.fn()

  beforeEach(() => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    component = render(
      <Blog
        key={blog.id}
        blog={blog}
        likeBlog={mockLikeBlog}
        deleteBlog={mockDeleteBlog}
      />
    )
  })

  test('by default renders title and author and nothing more', () => {
    const blogTitleComponent = component.container.querySelector('.blog-title')
    expect(blogTitleComponent).toHaveTextContent(blog.title)

    const blogAuthorComponent = component.container.querySelector(
      '.blog-author'
    )
    expect(blogAuthorComponent).toHaveTextContent(blog.author)

    const blogTogglableContent = component.container.querySelector(
      '.togglableContent'
    )
    expect(blogTogglableContent).toHaveStyle('display: none')
  })

  test('url and likes are show when the button is clicked', () => {
    const openBlogMoreButton = component.getByText('show')
    fireEvent.click(openBlogMoreButton)

    const blogTogglableContent = component.container.querySelector(
      '.togglableContent'
    )
    expect(blogTogglableContent).toHaveStyle('display: block')
  })

  test('like button clicked twice fires eventHandler twice', () => {
    const openBlogMoreButton = component.getByText('show')
    fireEvent.click(openBlogMoreButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLikeBlog.mock.calls).toHaveLength(2)
  })
})
