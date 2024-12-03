/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const Country = ({country}) => {

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

const AllCountries = ({countries, showCountry}) =>{
  

  
  if (countries.length ===1){
  return(<Country country={countries[0]} />)
    }
  else if(countries.length <= 10){
    return (countries.map(country => 
      <div key={country.ccn3}> <ShortCountry country={country} showCountry={() => showCountry(country.ccn3) } /></div>))

  }
}

const ShortCountry =({country, showCountry}) =>{

  return (<div>{country.name.common} 
  <button onClick={showCountry}>show</button>
  </div>)
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
  const [selectedCountries, setSelectedCountries] = useState(null)
  const [newFilter, setNewFilter] = useState('')

  const showCountry = ccn3 =>{

    const filteredCountry = countries.filter(country => country.ccn3===ccn3)
    setSelectedCountries(filteredCountry)
   
   
  }

  useEffect(() => {    
    countriesService
    .getAll() 
    .then(initialCountries => {            
      setCountries(initialCountries) 
      setSelectedCountries(initialCountries)     
  })  
  }, [])  
    
  const handleNewFilter = (event) => {  

    setNewFilter(event.target.value)
    const filteredCountries = countries.filter(country => 
      country.name.common
      .toLowerCase().includes(event.target.value.toLowerCase()))
    setSelectedCountries(filteredCountries)
   
  }  
  
  if (countries){
    
    return (
      <div>
        <h1>Countries</h1>
        <Filter 
        newFilter={newFilter} 
        handleNewFilter={handleNewFilter} 
      />
      
      <AllCountries countries={selectedCountries} filter={handleNewFilter} showCountry={showCountry}/>
        
        
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