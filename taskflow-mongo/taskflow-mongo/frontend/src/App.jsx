import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import api from './services/api'

function App(){
  const navigate = useNavigate()
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('taskflow_user')
    return raw ? JSON.parse(raw) : null
  })
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(()=>{
    if(!user) { navigate('/login'); return }
    fetchTasks()
  }, [user])

  async function fetchTasks(){
    try{
      const res = await api.get('/tasks')
      setTasks(res.data)
    }catch(err){
      console.error(err)
    }
  }

  async function handleAdd(){
    if(!title) return
    try{
      await api.post('/tasks', { title, description })
      setTitle(''); setDescription('')
      fetchTasks()
    }catch(err){ console.error(err) }
  }

  async function toggleDone(id, done){
    try{
      await api.put(`/tasks/${id}`, { done: !done })
      fetchTasks()
    }catch(err){ console.error(err) }
  }

  async function handleDelete(id){
    try{
      await api.delete(`/tasks/${id}`)
      fetchTasks()
    }catch(err){ console.error(err) }
  }

  function handleLogout(){
    localStorage.removeItem('taskflow_user')
    setUser(null)
    navigate('/login')
  }

  const doneCount = tasks.filter(t=>t.done).length
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-800 py-4 shadow">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">TaskFlow</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-300">{user?.user?.email}</div>
            <button onClick={handleLogout} className="bg-rose-500 text-white px-3 py-1 rounded hover:opacity-90">Logout</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="grid md:grid-cols-3 gap-6">
          <section className="md:col-span-2">
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">Minhas tarefas</h2>
              <p className="text-sm text-slate-400 mb-4">Progresso: {doneCount}/{tasks.length} concluídas</p>

              <div className="space-y-3">
                {tasks.map(task=>(
                  <div key={task._id} className="flex justify-between items-center p-3 bg-slate-700 rounded-lg hover:shadow transition">
                    <div>
                      <div className={`font-medium ${task.done ? 'text-green-400' : 'text-white'}`}>{task.title}</div>
                      <div className="text-sm text-slate-300">{task.description}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={()=>toggleDone(task._id, task.done)} className="px-3 py-1 bg-sky-500 rounded text-white">{task.done ? 'Desmarcar' : 'Concluir'}</button>
                      <button onClick={()=>handleDelete(task._id)} className="px-3 py-1 bg-rose-600 rounded text-white">Excluir</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside>
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg space-y-4">
              <h3 className="text-lg font-semibold">Adicionar tarefa</h3>
              <input className="w-full p-2 rounded bg-slate-700" placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} />
              <textarea className="w-full p-2 rounded bg-slate-700" placeholder="Descrição" value={description} onChange={e=>setDescription(e.target.value)} />
              <button onClick={handleAdd} className="w-full bg-teal-500 text-white py-2 rounded">Adicionar</button>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg shadow-lg mt-4">
              <h4 className="text-sm text-slate-300">Dicas</h4>
              <ul className="text-sm text-slate-400 list-disc ml-4 mt-2">
                <li>Use tarefas pequenas e objetivas</li>
                <li>Marque como concluído quando terminar</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-slate-900 py-4 text-center text-sm text-slate-500">
        Desenvolvido por Henrique Rafael — Projeto para portfólio
      </footer>
    </div>
  )
}

export default App
