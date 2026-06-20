import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function Cadastro() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ responsavelNome:'', responsavelEmail:'', criancaNome:'', criancaNascimento:'' })
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  function update(field, value) { setForm(f => ({ ...f, [field]: value })) }

  async function handleSubmit(e) {
    e.preventDefault(); setErro('')
    if (!form.responsavelNome || !form.responsavelEmail || !form.criancaNome || !form.criancaNascimento) {
      setErro('Preencha todos os campos para continuar! 😊'); return
    }
    setLoading(true)
    try {
      const { data, error } = await supabase.from('pilotos').insert({
        responsavel_nome: form.responsavelNome, responsavel_email: form.responsavelEmail,
        crianca_nome: form.criancaNome, crianca_nascimento: form.criancaNascimento, status: 'cadastro',
      }).select().single()
      if (error) throw error
      navigate('/quiz/' + data.id)
    } catch (err) { console.error(err); setErro('Ops! Algo deu errado. Tente novamente.') }
    finally { setLoading(false) }
  }

  return (
    <div className="screen">
      <div className="panel">
        <div className="eyebrow">🏁 Carteirinha Mirim</div>
        <h1 className="title">Vamos tirar a carteirinha do seu piloto?</h1>
        <p className="subtitle">É rapidinho! Primeiro, conta pra gente quem é o responsável e quem vai ser o motorista mirim.</p>
        <form onSubmit={handleSubmit}>
          <label className="field-label">Seu nome (responsável)</label>
          <input type="text" placeholder="Ex: Ana Paula Souza" value={form.responsavelNome} onChange={e => update('responsavelNome', e.target.value)} />
          <label className="field-label">Seu e-mail</label>
          <input type="email" placeholder="Ex: ana@email.com" value={form.responsavelEmail} onChange={e => update('responsavelEmail', e.target.value)} />
          <label className="field-label">Nome da criança (piloto mirim)</label>
          <input type="text" placeholder="Ex: Maria Eduarda Santos" value={form.criancaNome} onChange={e => update('criancaNome', e.target.value)} />
          <label className="field-label">Data de nascimento da criança</label>
          <input type="date" value={form.criancaNascimento} onChange={e => update('criancaNascimento', e.target.value)} />
          {erro && <div className="error-text">{erro}</div>}
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Começar o teste! 🚦'}</button>
        </form>
      </div>
    </div>
  )
}
