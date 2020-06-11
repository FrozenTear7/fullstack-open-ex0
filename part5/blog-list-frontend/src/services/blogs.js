import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = async () => {
  const res = await axios.get(baseUrl)

  return res.data
}

const create = async (blog) => {
  const res = await axios.post(baseUrl, blog)

  return res.data
}

export default { getAll, create }
