import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setAnecdoteFilter } from '../reducers/filterReducer'

const AnecdoteFilter = (props) => {
  // const [filter, setFilter] = useState(useSelector((state) => state.filter))
  const [filter, setFilter] = useState(props.filter)

  // const dispatch = useDispatch()

  const handleOnChangeFilter = ({ target }) => {
    const newFilter = target.value
    // dispatch(setAnecdoteFilter(newFilter))
    props.setAnecdoteFilter(newFilter)
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

const mapStateToProps = ({ filter }) => {
  return {
    filter,
  }
}

const mapDispatchToProps = () => {
  return { setAnecdoteFilter }
}

const ConnectedAnecdoteFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteFilter)

export default ConnectedAnecdoteFilter
