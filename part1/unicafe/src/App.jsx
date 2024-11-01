/* eslint-disable react/prop-types */
import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = props => <tr><td>{props.text}</td> <td>{props.value}</td></tr>

const Statistics = (props) =>{
  const sum = props.good + props.neutral + props.bad
  const diff = props.good - props.bad
  if (sum === 0) {return  (<div><Heading1 value="statistics"/>
  <p>No feedback given</p>
  </div>)}
  else{
  return (<div>
    <Heading1 value="statistics"/>
    <StatisticLine text="good" value={props.good} />
    <StatisticLine text="neutral" value={props.neutral} />
    <StatisticLine text="bad" value={props.bad} />
    <StatisticLine text="all" value={sum} />
    <StatisticLine text="average" value={(diff)/(sum)} />
    <StatisticLine text="positive" value={(100*(props.good)/(sum)).toString() + " %"}  />
  </div>)}
}

const Heading1 = props => <h1>{props.value}</h1>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Heading1 value="give feedback"/>
      <Button handleClick={() => setGood(good +1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral +1)} text="neutral"/>
      <Button handleClick={() => setBad(bad +1)} text="bad"/>
      
      
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App