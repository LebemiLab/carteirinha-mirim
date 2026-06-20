import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const ADMIN_SENHA = 'mirim2026'

export default function Admin() {
  const [autenticado, setAutenticado] = useState(false)
  const [senhaInput, setSenhaInput] = useState('')
  const [pilotos, setPilotos] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => { if (autenticado) carregar() }, [autenticado])

  async function carregar() {
    setLoading(true)
    const { data, error } = await supabase.from('pilotos').select('*').order('created_at', { ascending: false })
    if (!error) setPilotos(data)
    setLoading(false)
  }

  function handleLogin(e) {
    e.preventDefault()
    if (senhaInput === ADMIN_SENHA) setAutenticado(true)
    else alert('Senha incorreta')
  }

  if (!autenticado) return (
    <div className="screen">
      <div className="panel">
        <h1 className="title">Painel Admin</h1>
        <form onSubmit={handleLogin}>
          <label className="field-label">Senha</label>
          <input type="text" value={senhaInput} onChange={e=>setSenhaInput(e.target.value)} placeholder="Digite a senha"/>
          <button className="btn btn-secondary" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  )

  const totalConcluidos = pilotos.filter(p=>p.status==='concluido').length
  return (
    <div className="screen" style={{justifyContent:'flex-start',paddingTop:40}}>
      <div className="panel" style={{maxWidth:900}}>
        <h1 className="title">Painel de Pilotos</h1>
        <p className="subtitle">{pilotos.length} cadastros · {totalConcluidos} carteirinhas concluídas</p>
        {loading ? <div className="loading-spin"/> : (
          <div style={{overflowX:'auto'}}>
            <table className="admin-table">
              <thead><tr><th>Criança</th><th>Nascimento</th><th>Responsável</th><th>E-mail</th><th>Acertos</th><th>Status</th><th>Data</th></tr></thead>
              <tbody>{pilotos.map(p=>(
                <tr key={p.id}>
                  <td>{p.crianca_nome}</td><td>{p.crianca_nascimento}</td><td>{p.responsavel_nome}</td>
                  <td>{p.responsavel_email}</td><td>{p.quiz_acertos??'-'}/5</td><td>{p.status}</td>
                  <td>{p.created_at?new Date(p.created_at).toLocaleDateString('pt-BR'):''}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
