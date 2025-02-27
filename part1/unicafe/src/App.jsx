import { useState } from 'react';
import Button from './Button';
import StatisticLine from './StatisticLine';


const Statistics = (props) => {
  const { good, neutral, bad, all, average, positive } = props;
  if(all>0){
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={`${positive} %`} />
        </tbody>
      </table>
    </div>
  )}
  return(
    <div>No feedback given</div>
  )
}




const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good+1)

  const handleNeutralClick = () => setNeutral(neutral+1)

  const handleBadClick = () => setBad(bad+1)

  const all = good + neutral + bad
  const average = ((good*1)+(bad*-1))/all
  const positive = (good/all)*100
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />

    </div>
  )
}

export default App