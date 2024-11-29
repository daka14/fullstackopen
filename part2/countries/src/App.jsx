import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const Filter = (props) => {
  return (<div>
    filter: <input 
    value={props.newFilter}
    onChange={props.handleNewFilter}/>
  </div>)
}

const App = () => {
  const [countries, setCountries] = useState(null)
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {    
    countriesService
    .getAll() 
    .then(initialCountries => {            
      setCountries(initialCountries)      
  })  
  }, [])  
    
  const handleNewFilter = (event) => {
    
    setNewFilter(event.target.value)
  }  
  
  if (countries){
    return (
      <div>
        <h1>Countries</h1>
        <Filter 
        newFilter={newFilter} 
        handleNewFilter={handleNewFilter} 
      />
        <div>{countries[0].name.common}</div>
        
        </div>
    )
  }
  else {
    return (
      <div>
        <h1>Countries</h1>
        </div>)
  }
}

export default App