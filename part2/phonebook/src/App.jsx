/* eslint-disable no-unused-vars */
import { useState } from 'react'

const Person = (person) => {
  return (<li>{person.person.name} {person.person.number}</li>)

  
}

const Filter = (filter) => {
  return(<div>
    filter: <input 
    value={filter.newFilter}
    onChange={filter.handleNewFilter}
    />
  </div>)
}

const PersonForm = (person) =>{
  return( <form onSubmit={person.addName}>
    <div>
      name: <input 
      value={person.newName}
      onChange={person.handleNewName}
      />
    </div>
    <div>
      number: <input 
      value={person.newNumber}
      onChange={person.handleNewNumber}
      />
    </div>
    <div>

      <button type="submit">add</button>
    </div>
  </form>)
}

const Persons = (persons) =>{
  return (<ul>
    {persons.persons.map((person) => {if (person.name.toLowerCase().includes(persons.newFilter.toLowerCase()))
    {return <Person key={person.id} person= {person}/>} }
    
    )} 
    </ul>)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', 
      id:1,
    number: '040-123456' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
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
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter} />
      <h3>Add New</h3>
      <PersonForm addName={addName} 
      newName={newName} 
      handleNewName={handleNewName} 
      newNumber={newNumber} 
      handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App