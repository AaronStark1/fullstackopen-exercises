import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdoteAsync } from './reducers/anecdoteReducer'
import { setNotificationWithTimeout } from './reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdoteAsync(anecdote.id))
    dispatch(setNotificationWithTimeout(`You voted for: "${anecdote.content}"`, 5000))
  }
  
  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )
  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)
  return (
    <div>
        {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
