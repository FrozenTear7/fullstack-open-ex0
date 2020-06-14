import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { good, ok, bad, zero } from './reducers/counterReducer'
import Statistics from './components/Statistics'

const App = () => {
  const dispatch = useDispatch()
  const counter = useSelector((state) => state)

  return (
    <div>
      <button type="button" onClick={() => dispatch(good())}>
        good
      </button>
      <button type="button" onClick={() => dispatch(ok())}>
        ok
      </button>
      <button type="button" onClick={() => dispatch(bad())}>
        bad
      </button>
      <button type="button" onClick={() => dispatch(zero())}>
        reset stats
      </button>
      <Statistics good={counter.good} ok={counter.ok} bad={counter.bad} />
    </div>
  )
}

export default App
