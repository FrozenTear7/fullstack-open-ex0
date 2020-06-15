import React from 'react'
import PropTypes from 'prop-types'
import Statistic from './Statistic'

const Statistics = ({ good, ok, bad }) => {
  const scoreCount = good + ok + bad

  const calculateAvgScore = () => (good - bad) / scoreCount || 0

  const calculatePositivePercent = () => (good / scoreCount) * 100 || 0

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="ok" value={ok} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={scoreCount} />
          <Statistic text="average" value={calculateAvgScore()} />
          <Statistic
            text="positive"
            value={`${calculatePositivePercent()} %`}
          />
        </tbody>
      </table>
    </div>
  )
}

Statistics.displayName = 'Statistics'
Statistics.propTypes = {
  good: PropTypes.number.isRequired,
  ok: PropTypes.number.isRequired,
  bad: PropTypes.number.isRequired,
}

export default Statistics
