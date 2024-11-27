/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import personsService from './services/persons'


const Person = ({person, deletePerson}) => {
  
  return (<div>{person.name} {person.number} <button onClick={() => deletePerson(person)}>Delete</button> </div>)
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
    return(<Person key={person.id} person= {person}  deletePerson={props.deletePerson}/>)}
    })} 
    </div>)
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() =>{
    personsService
    .getAll()
    .then(allPersons => {     
      setPersons(allPersons)
    })
  }, [])


  const addName = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name.includes(newName)))
      {
      if (confirm(`${newName} is already added to phonebook, replace old number with a new one?`))
      {
        const personObject = persons.pop(newName)
        personObject.number=newNumber
        personsService
        .update(personObject.id,personObject)
        .then(updatedPerson => {
          setPersons(persons.concat(updatedPerson))
        })
        setNewName('')
        setNewNumber('')
      }
      else
      {
        setNewName('')
        setNewNumber('')
      }
    }
    else{
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length +1)
    }
    
    personsService
      .create(personObject)
      .then(allPersons =>{
        setPersons(persons.concat(allPersons))
        setNewName('')
        setNewNumber('')
      })
    } 
  }

  const deletePerson = (person) => {
    console.log(person)
    if (confirm(`Delete ${person.name} ?`)){
    personsService
    .remove(person.id)
    .then(removedPerson => {
      const reducedPersons = persons.filter((person) => person.id !== removedPerson.id)
      setPersons(reducedPersons)
    })
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
        deletePerson={deletePerson}
      />
    </div>
  )
}


export default App