import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const Country = ({country}) => {
  console.log(country)
  return (<div>
    <h1>{country.name.common}</h1>
    <p>
      capital {country.capital}
    </p>
    <p>
      area {country.area}
    </p>
    <h3>
      languages:
    </h3>
    <ul>
      {Object.values(country.languages).map((value,index) => 
        <li key={index} >
           {value}
           </li>
       )} 
        
    </ul>
    <div>
      {country.flag}
    </div>
    </div>)
  
}

const AllCountries = ({countries, filter}) =>{
  
  const filteredCountries = countries.filter(country => 
    country.name.common
    .toLowerCase().includes(filter.toLowerCase()))
  
  if (filteredCountries.length ===1){
  return(<Country country={filteredCountries[0]} />)
    }
  else if(filteredCountries.length <= 10){
    return (filteredCountries.map(country => 
      <div key={country.ccn3}> <ShortCountry country={country} /></div>))
  }
}

const ShortCountry =({country}) =>{
  return (<div>{country.name.common}</div>)
}

const Filter = (props) => {
  return (<div>
    find country: <input 
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
      
      <AllCountries countries={countries} filter={newFilter} />
        
        
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