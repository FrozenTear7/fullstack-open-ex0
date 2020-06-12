import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component

  const newBlog = {
    title: 'test',
    author: 'test author',
    url: 'test url',
  }

  const createBlogMock = jest.fn()

  beforeEach(() => {
    component = render(<BlogForm createBlog={createBlogMock} />)
  })

  test('post handler called with right details', () => {
    const blogForm = component.container.querySelector('#blog-form')
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')

    fireEvent.change(titleInput, {
      target: { value: newBlog.title },
    })
    fireEvent.change(authorInput, {
      target: { value: newBlog.author },
    })
    fireEvent.change(urlInput, {
      target: { value: newBlog.url },
    })
    fireEvent.submit(blogForm)

    expect(createBlogMock).toBeCalledWith(newBlog)
  })
})
