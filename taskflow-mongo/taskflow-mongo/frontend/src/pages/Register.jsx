import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Register(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    try{
      const res = await api.post('/auth/register', { name, email, password })
      localStorage.setItem('taskflow_user', JSON.stringify(res.data))
      navigate('/')
    }catch(err){
      alert(err.response?.data?.message || 'Erro ao registrar')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-slate-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Criar conta</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="w-full p-3 rounded bg-slate-700" placeholder="Nome" value={name} onChange={e=>setName(e.target.value)} />
          <input className="w-full p-3 rounded bg-slate-700" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="w-full p-3 rounded bg-slate-700" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="w-full bg-emerald-500 py-2 rounded text-white">Registrar</button>
        </form>
      </div>
    </div>
  )
}
