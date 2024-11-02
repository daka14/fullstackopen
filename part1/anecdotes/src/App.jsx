import { useState } from 'react'

const AnecdoteDisplay = (props) => (<div>
  <h1>Anecdote of the day</h1>
  {props.anecdotes[props.selected]}
  
  <p>has {props.votes[props.selected]} votes</p>  
  
  </div>)

const AnecdoteStatistics = (props) => {
  if (props.mostVoted < 0) 
    return (<div>
      <h1>Anecdote with most votes</h1>
      <p>No votes casted yet</p>
      </div>)
  else 
    return (<div>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[props.mostVoted]}</p>
      </div>)
  
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)





const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const votes_init = new Array(anecdotes.length).fill(0) 

  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(-1)
  const [votes, setVote] = useState(votes_init)

  

  const findMostVoted = (array) => {
   
    let maxIndex = 0

    for (let i =1; i<array.length;i++){
      if (array[maxIndex] < array[i]) maxIndex = i
    }
    
    return maxIndex
  }

  const handleVote = () => {
   
    const newVotes =[...votes]
    const vote = newVotes[selected]

    newVotes[selected] = vote +1
      
    setVote(newVotes)
    
    const newMostVoted = findMostVoted(newVotes)
    
    setMostVoted(newMostVoted)
    
  }

   

  return (
    <div>
     <AnecdoteDisplay anecdotes={anecdotes} votes={votes} selected={selected} />
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * (anecdotes.length -1)))} text="next anecdote" />
      <AnecdoteStatistics anecdotes={anecdotes} mostVoted={mostVoted} />     
    </div>
  )
}

export default App