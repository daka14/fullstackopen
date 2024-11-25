/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = (person) => {
  
  return (<div>{person.person.name} {person.person.number}</div>)
}

const Filter = (props) => {
  return (<div>
    filter: <input 
    value={props.newFilter}
    onChange={props.handleNewFilter}/>
  </div>)
}

const PersonForm = (props) => {
  return (<form onSubmit={props.addName}>
    <div>
      name: <input 
      value={props.newName}
      onChange={props.handleNewName}/>
    </div>
    <div>
      number: <input 
      value={props.newNumber}
      onChange={props.handleNewNumber}/>
    </div>
    <div>

      <button type="submit">add</button>
    </div>
  </form>)
}

const Persons = (props) => {
  return (<div>
    {props.persons.map((person) => {
      if (person.name.toLowerCase().includes(props.newFilter.toLowerCase())){
    return(<Person key={person.id} person= {person}  />)}
    })} 
    </div>)
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() =>{
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])


  const addName = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)){
      alert(`${newName} is already in phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else{
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length +1)
    }
    const names = persons.map(person => person.name)
    if (names.includes(newName)){
      alert(`${newName} already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else{
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }
  }

  const handleNewName = (event) => {
    
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        newFilter={newFilter} 
        handleNewFilter={handleNewFilter} 
      />
      <h3>Add new</h3>  
      <PersonForm addName= {addName} 
        newName={newName} 
        handleNewName= {handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber} 
      />
      <h3>Numbers</h3>
      <Persons persons={persons}
        newFilter={newFilter} 
      />
    </div>
  )
}

export default App