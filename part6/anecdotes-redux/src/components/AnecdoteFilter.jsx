import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAnecdoteFilter } from '../reducers/filterReducer'

const AnecdoteFilter = () => {
  const [filter, setFilter] = useState(useSelector((state) => state.filter))

  const dispatch = useDispatch()

  const changeFilter = ({ target }) => {
    const newFilter = target.value
    dispatch(setAnecdoteFilter(newFilter))
    setFilter(newFilter)
  }

  return (
    <div>
      filter: <input onChange={changeFilter} value={filter} />
    </div>
  )
}

export default AnecdoteFilter
