import { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function Foto() {
  const { id } = useParams(); const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [preview, setPreview] = useState(null); const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false); const [erro, setErro] = useState('')

  function handleFileChange(e) {
    const f = e.target.files?.[0]; if (!f) return
    setFile(f); setPreview(URL.createObjectURL(f)); setErro('')
  }

  async function handleSubmit() {
    if (!file) { setErro('Escolha uma foto para continuar! 📸'); return }
    setLoading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const filePath = id + '-' + Date.now() + '.' + fileExt
      const { error: uploadError } = await supabase.storage.from('fotos-pilotos').upload(filePath, file)
      if (uploadError) throw uploadError
      const { data: publicUrlData } = supabase.storage.from('fotos-pilotos').getPublicUrl(filePath)
      const { error: updateError } = await supabase.from('pilotos').update({ foto_url: publicUrlData.publicUrl, status: 'concluido' }).eq('id', id)
      if (updateError) throw updateError
      navigate('/carteirinha/' + id)
    } catch (err) { console.error(err); setErro('Não foi possível enviar a foto. Tente novamente.') }
    finally { setLoading(false) }
  }

  return (
    <div className="screen">
      <div className="panel">
        <div className="eyebrow">📸 Última etapa</div>
        <h1 className="title">Agora, uma foto do piloto!</h1>
        <p className="subtitle">Escolha uma foto bem iluminada, de rostinho para a carteirinha ficar show.</p>
        <div className="photo-drop" onClick={() => fileInputRef.current?.click()}>
          {preview ? <img src={preview} alt="Pré-visualização" /> : <div className="hint">Toque aqui para escolher a foto</div>}
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" capture="environment" style={{display:'none'}} onChange={handleFileChange} />
        {erro && <div className="error-text" style={{textAlign:'center'}}>{erro}</div>}
        <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>{loading ? 'Enviando foto...' : 'Gerar minha carteirinha! 🏁'}</button>
      </div>
    </div>
  )
}
