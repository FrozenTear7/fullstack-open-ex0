import {
  CREATE_BLOG,
  INIT_BLOGS,
  UPDATE_BLOG,
  DELETE_BLOG,
} from '../types/blogTypes'
import blogService from '../services/blogs'
import { setNotification } from './notificationActions'

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.createBlog(blog)

      dispatch({
        type: CREATE_BLOG,
        data: newBlog,
      })

      dispatch(
        setNotification({
          message: `Successfully created blog ${blog.title}`,
          isPositive: true,
        })
      )
    } catch (error) {
      dispatch(
        setNotification({
          message: error.response.data.error,
          isPositive: false,
        })
      )

      throw error
    }
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAllBlogs()

      dispatch({
        type: INIT_BLOGS,
        data: blogs,
      })
    } catch (error) {
      dispatch(
        setNotification({
          message: error.response.data.error,
          isPositive: false,
        })
      )
    }
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.updateBlog(blog)

      dispatch({
        type: UPDATE_BLOG,
        data: updatedBlog,
      })

      dispatch(
        setNotification({
          message: 'Successfully liked the blog',
          isPositive: true,
        })
      )
    } catch (error) {
      dispatch(
        setNotification({
          message: error.response.data.error,
          isPositive: false,
        })
      )
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(id)

      dispatch({
        type: DELETE_BLOG,
        data: id,
      })

      dispatch(
        setNotification({
          message: 'Successfully deleted the blog',
          isPositive: true,
        })
      )
    } catch (error) {
      dispatch(
        setNotification({
          message: error.response.data.error,
          isPositive: false,
        })
      )
    }
  }
}
