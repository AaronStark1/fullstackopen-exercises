import { useState } from 'react'
import Button from './Button'

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
   
  const [selected, setSelected] = useState(0)

  const [votes,setVotes] = useState(new Array(8).fill(0))

  const [max,setMax] = useState(0)

  const handleSelect = () =>{
    let  x = Math.floor(Math.random()*8)
    setSelected(x)

    console.log(x)
  
  }

  const handleVotes = () =>{
    const copy = {...votes}
    copy[selected] += 1
    setVotes(copy)
    if( copy[selected] > copy[max] ){
      setMax(selected)
    }
    }
  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>has {votes[selected]} votes<br/>
      <Button onClick={handleVotes} text='vote'/>
      <Button onClick={handleSelect} text='next anecdote'/>

      <h1>Anecdote with most votes</h1>
      {anecdotes[max]}
      <br/>has {votes[max]} votes
    </div>
  )
}

export default App