import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      <h2>Blog list</h2>
      <hr />
      <ListGroup>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <ListGroup.Item key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  )
}

export default BlogList
