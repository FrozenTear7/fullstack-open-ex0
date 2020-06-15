import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAnecdoteFilter } from '../reducers/filterReducer'

const AnecdoteFilter = () => {
  const [filter, setFilter] = useState(useSelector((state) => state.filter))

  const dispatch = useDispatch()

  const handleOnChangeFilter = ({ target }) => {
    const newFilter = target.value
    dispatch(setAnecdoteFilter(newFilter))
    setFilter(newFilter)
  }

  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter: <input onChange={handleOnChangeFilter} value={filter} />
    </div>
  )
}

export default AnecdoteFilter
