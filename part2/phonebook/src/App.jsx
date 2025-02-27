import axios from 'axios'
import { useEffect, useState } from 'react'
import personService from './services/persons.js'
import Notifications from './Notifications.jsx'


const Filter = ({filter,onChange}) => {
  return(
    <div>
    filter shown with
    <input 
      value={filter}
      onChange={onChange}
    />
  </div>
  )
}

const PersonForm = (props) => {
  const {addPerson,handleNameChange,handleNumberChange,newName,newNumber} = props
  return(
    <form onSubmit={addPerson}>
    <div>
      name: 
      <input 
        value={newName}
        onChange={handleNameChange}
      />
    </div>
    <div>
      number:
      <input 
        value={newNumber}
        onChange={handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({filteredPersons , handleDelete}) => {
  return(
    <div>
    {filteredPersons.map((person) => 
      <div key={person.name}>{person.name} {person.number} 
      <button onClick={() => handleDelete(person)} type="submit">delete</button>
    </div>
      
    )}
    </div>
  )
}

const App = () => {

  useEffect(() => {
    personService
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }, [])

  const [persons, setPersons] = useState([])

  const [errorMessage, setErrorMessage] = useState(null);
  
  const [isError, setIsError] = useState(false);


  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
   
  }
  const filteredPersons = persons.filter((person)=>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)

  const [newNumber, setNewNumber] = useState('')

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleDelete = (person) => {
    if(confirm(`Delete ${person.name} ?`))
    { personService
      .deletePerson(person.id)
      .then(returnedPerson => {
        setPersons(persons.filter(p => p.id !== person.id))
        console.log('deleted',returnedPerson)
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const found = persons.find((person) => person.name === newName)
    if(found){
      if(confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const updatedPerson = {...found,number: newNumber}

        personService
        .update(found.id,updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== found.id ? p : returnedPerson));
          setErrorMessage(`Changed number for ${returnedPerson.name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(
            `Information of '${newName}' has already been removed from server`
          )
          setIsError(true)
          setTimeout(() => {
            setErrorMessage(null)
            setIsError(false)
          }, 5000)
          setPersons(persons.filter(p => p.id !== found.id))
          setNewName('')
          setNewNumber('')
        })
      }
      
    }
    else{
    const personObject = {
      name:newName,
      number:newNumber
    }
    personService
      .create(personObject)
      .then(returnedPerson =>{
      setPersons(persons.concat(returnedPerson))
      setErrorMessage(`Added ${returnedPerson.name}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNewName("")
      setNewNumber("")
      })
    }
  }

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications message={errorMessage} isError={isError}/>
      <Filter filter={filter} onChange={handleFilterChange}/>
      
      <h3>add a new</h3>

      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber}
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App