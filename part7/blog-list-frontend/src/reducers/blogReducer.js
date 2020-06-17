import {
  CREATE_BLOG,
  INIT_BLOGS,
  UPDATE_BLOG,
  DELETE_BLOG,
} from '../types/blogTypes'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BLOG:
      return [...state, action.data]
    case UPDATE_BLOG:
      return state.map((blog) => {
        if (blog.id === action.data.id) return action.data
        return blog
      })
    case DELETE_BLOG:
      return state.filter((blog) => blog.id !== action.data)
    case INIT_BLOGS:
      return action.data
    default:
      return state
  }
}

export default reducer
