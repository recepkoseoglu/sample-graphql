import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.API_HOST || 'https://jsonplaceholder.typicode.com',
})

export default instance
