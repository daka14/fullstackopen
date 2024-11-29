import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    const requestString = `${baseUrl}/all`
    console.log(requestString)
    const request = axios.get(requestString)
    

    return request.then(response => response.data)
  }

export default {getAll}