import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toPng } from 'html-to-image'
import { supabase } from '../lib/supabaseClient'

function formatDate(d){if(!d)return '';const[y,m,dd]=d.split('-');return dd+'/'+m+'/'+y}
function regNumber(id){return 'MIR-'+String(id).replace(/-/g,'').slice(0,8).toUpperCase()}

export default function Carteirinha() {
  const { id } = useParams(); const cardRef = useRef(null)
  const [piloto, setPiloto] = useState(null); const [loading, setLoading] = useState(true); const [baixando, setBaixando] = useState(false)

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from('pilotos').select('*').eq('id', id).single()
      if (!error) setPiloto(data); setLoading(false)
    }
    load()
  }, [id])

  async function handleDownload() {
    if (!cardRef.current) return; setBaixando(true)
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, cacheBust: true })
      const link = document.createElement('a'); link.download = 'carteirinha-'+(piloto?.crianca_nome||'mirim')+'.png'; link.href = dataUrl; link.click()
    } catch(err){console.error(err)} finally{setBaixando(false)}
  }

  if (loading) return <div className="screen"><div className="center-text"><div className="loading-spin"/><p style={{fontWeight:700}}>Preparando a carteirinha...</p></div></div>
  if (!piloto) return <div className="screen"><div className="panel center-text"><h1 className="title">Não encontramos essa carteirinha 😕</h1></div></div>

  return (
    <div className="screen">
      <div className="card-wrap">
        <div className="eyebrow center-text" style={{justifyContent:'center'}}>🎉 Carteirinha aprovada!</div>
        <h1 className="title center-text" style={{marginBottom:20}}>Parabéns, Piloto {piloto.crianca_nome?.split(' ')[0]}!</h1>
        <div className="id-card" ref={cardRef}>
          <div className="id-top-band">
            <div className="id-brand">
              <div className="id-brand-mark">🚗</div>
              <div><div className="id-brand-name">[NOME DA MARCA]</div><div className="id-brand-sub">CARRINHOS ELÉTRICOS PRA CRIANÇA SER GRANDE</div></div>
            </div>
            <div className="id-doc-title"><div className="main">CARTEIRINHA DE<br/>MOTORISTA MIRIM</div><div className="country">VRUUUM! ✓ APROVADO</div></div>
          </div>
          <div className="id-body">
            <div className="id-photo-block">
              <div className="id-photo">{piloto.foto_url && <img src={piloto.foto_url} alt={piloto.crianca_nome}/>}</div>
              <div className="id-mascot">🏁</div>
            </div>
            <div className="id-info">
              <div className="id-field full"><div className="label">Nome do Piloto</div><div className="value big">{piloto.crianca_nome}</div></div>
              <div className="id-field"><div className="label">Nasceu em</div><div className="value">{formatDate(piloto.crianca_nascimento)}</div></div>
              <div className="id-field"><div className="label">Categoria</div><div className="id-pill">🚸 PILOTO MIRIM</div></div>
              <div className="id-field"><div className="label">Carteirinha Nº</div><div className="value">{regNumber(piloto.id)}</div></div>
              <div className="id-field"><div className="label">Validade</div><div className="value">PRA SEMPRE 💛</div></div>
            </div>
          </div>
          <div className="id-footer">
            <div className="reg"><b>QUER TIRAR A SUA?</b>[seudominio.com.br]</div>
            <div className="icons"><div className="icon-chip">🚦</div><div className="icon-chip">🛑</div><div className="icon-chip">🏆</div></div>
          </div>
        </div>
        <button className="btn btn-secondary" onClick={handleDownload} disabled={baixando}>{baixando?'Gerando imagem...':'⬇️ Baixar carteirinha'}</button>
        <div className="upsell-box">
          <div className="upsell-title">🎁 Deixa a carteirinha ainda mais top!</div>
          <p>Que tal um porta-carteirinha personalizado ou um kit de acessórios pro carrinho do piloto? Temos uma oferta especial só para quem chegou até aqui.</p>
          <button className="btn btn-yellow" style={{marginTop:0}}>Ver oferta especial 🎉</button>
        </div>
      </div>
    </div>
  )
}
