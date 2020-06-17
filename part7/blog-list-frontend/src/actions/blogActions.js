import {
  CREATE_BLOG,
  INIT_BLOGS,
  UPDATE_BLOG,
  DELETE_BLOG,
} from '../types/blogTypes'
import blogService from '../services/blogs'

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.createBlog(blog)

    dispatch({
      type: CREATE_BLOG,
      data: newBlog,
    })
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAllBlogs()

    dispatch({
      type: INIT_BLOGS,
      data: blogs,
    })
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.updateBlog(blog)

    dispatch({
      type: UPDATE_BLOG,
      data: updatedBlog,
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)

    dispatch({
      type: DELETE_BLOG,
      data: id,
    })
  }
}
