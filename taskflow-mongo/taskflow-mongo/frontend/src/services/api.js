import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:4000/api'
})

API.interceptors.request.use(config => {
  const raw = localStorage.getItem('taskflow_user')
  if(raw){
    const { token } = JSON.parse(raw)
    if(token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default API
