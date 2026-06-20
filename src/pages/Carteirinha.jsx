import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toPng } from 'html-to-image'
import { supabase } from '../lib/supabaseClient'

function formatDate(isoDate) {
  if (!isoDate) return ''
  const [y, m, d] = isoDate.split('-')
  return `${d}/${m}/${y}`
}

function regNumber(id) {
  const base = String(id).replace(/-/g, '').slice(0, 8).toUpperCase()
  return `MIR-${base}`
}

function BangtoysLogo({ height = 32 }) {
  return (
    <svg height={height} viewBox="0 0 109.86 40.02" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          .bt-1 { fill: #ea8b2b; }
          .bt-2 { fill: #fff; }
          .bt-3 { fill: #d1db2d; }
          .bt-4 { fill: #d8175f; }
          .bt-5 { fill: #009d90; }
        `}</style>
      </defs>
      <g>
        <path className="bt-2" d="M107.62,31.21v-.04c-.07-.38-.14-.76-.21-1.14l-.34-1.81-.17.03c.63-.93.92-1.93,1.01-2.87.17-1.81-.5-3-1.09-3.68-.58-.66-1.34-1.17-2.32-1.55,1.4-.97,2.39-2.41,2.6-4.52.02-.19.03-.38.03-.57l1.11-.63,1.63-.92-.91-1.64-1.17-2.11-.68-1.22-1.36.29-3.08.66c-1.39-.45-3.08-.67-5.06-.67-4.81,0-7.43,1.29-8.84,2.84-.11-.15-.22-.29-.35-.43-1.45-1.59-3.73-2.44-6.61-2.44-1.61,0-3.23.29-4.7.82l-.45-.69-1.08.05-4.67.2-1.64.07-.14,1.42c-1.59-1.25-3.97-1.82-7.54-1.82-2.73,0-5.17.32-7.3.92-.22-.51-.53-.99-.92-1.42-1.62-1.79-4.53-2.69-8.63-2.69h-12.07l-.16,1.7-1.8,18.58-.2,2.07h12.36c3.86,0,6.81-.72,8.82-2.11.03.04.06.08.09.11,1.35,1.49,3.47,2.25,6.29,2.25,1.48,0,2.85-.23,4.05-.66l.12.41h23.98s.04.1.06.14l-.14.23c-.22.36-.44.72-.66,1.07l-1.1,1.76,1.8.9c-.34.67-.68,1.34-1.03,2l-.96,1.82,1.89.8c.82.35,1.67.66,2.52.92l1.64.51.13-.31c.67.43,1.55.71,2.63.86h.02s.02,0,.02,0c.38.04.74.07,1.08.07.12,0,.22-.02.34-.02l-.2.65,1.98.45c.42.1.87.14,1.36.14.16,0,.32,0,.48-.02,2.19-.14,3.4-1.11,4.05-2.1h.05c.11.01.22.01.34.01.78,0,1.64-.16,2.55-.48,3.28-1.18,3.9-3.33,3.39-4.94-.17-.52-.46-.96-.84-1.28Z"/>
        <circle className="bt-2" cx="16.11" cy="16.11" r="16.11"/>
        <g>
          <g>
            <path className="bt-3" d="M63.09,25.55l-.1-.02c-1.26.97-3.03,1.49-5.15,1.49-3.88,0-6.18-1.66-5.85-5.08.27-2.82,3.21-4.78,7.65-4.78,1.37,0,2.39.1,3.28.3l.06-.59c.11-1.14-.67-1.76-3.18-1.76-2.18,0-3.51.25-5.46.77l-.15-3.54c2.11-.64,4.56-.94,7.17-.94,6.31,0,8.27,1.88,7.86,6.12l-.9,9.27h-4.9l-.34-1.21ZM62.6,20.42c-.41-.12-1.07-.22-2.02-.22-1.66,0-2.45.52-2.56,1.69s.62,1.61,1.89,1.61,2.45-.54,2.53-1.39l.16-1.69Z"/>
            <path className="bt-1" d="M80.54,26.77l.94-9.74c.12-1.29-.64-1.78-2.15-1.78-1.02,0-2,.3-2.58.82l-1.04,10.7h-6.41l1.46-15.06,4.67-.2.73,1.14c1.56-.84,3.47-1.31,5.41-1.31,4.16,0,6.68,2.01,6.32,5.7l-.94,9.74h-6.41Z"/>
            <path className="bt-4" d="M94.43,20.65c-.23.15-.39.35-.4.52-.03.3.3.52,1.07.55l4.49.17c4.56.17,6.44,1.49,6.21,3.94-.3,3.07-3.44,4.96-10.06,4.96-5.95,0-8.33-1.66-8.11-3.89.08-.84.65-1.66,1.7-2.28-.87-.5-1.47-1.21-1.37-2.23s.9-2.03,2.8-2.73c-1.3-.72-2.07-1.88-1.91-3.57.26-2.73,2.71-4.73,8.53-4.73,1.76,0,3.54.2,4.93.74l3.6-.77,1.17,2.11-2.2,1.24c.1.42.16.89.11,1.41-.29,3-2.92,4.66-8.48,4.66-.71,0-1.41-.02-2.07-.1ZM93.68,25.4c-.38.27-.55.59-.58.87-.08.82.73,1.17,2.81,1.17,3.21,0,3.98-.35,4.04-.99.05-.52-.35-.74-1.89-.82l-4.38-.22ZM95.14,16.19c-.12,1.19.49,1.54,1.58,1.54,1.48,0,1.97-.35,2.09-1.54s-.35-1.51-1.69-1.51-1.87.4-1.98,1.51Z"/>
          </g>
          <g>
            <path className="bt-5" d="M90.48,32.51c-.49,1.34-1.01,2.66-1.55,3.98-.79-.24-1.57-.53-2.34-.85.66-1.25,1.3-2.52,1.91-3.8-.56-.22-1.11-.47-1.65-.74.23-.37.45-.73.68-1.1,1.61.79,3.29,1.34,5,1.66-.1.42-.2.84-.31,1.26-.58-.11-1.16-.25-1.73-.41Z"/>
            <path className="bt-5" d="M93.03,37.48c-2.27-.31-3.04-1.26-2.45-2.86.58-1.62,1.62-1.99,3.48-1.79,1.86.17,2.65.75,2.51,2.48-.15,1.7-1.25,2.44-3.53,2.17ZM93.29,36.43c.68.08.98-.13,1.17-1.17.19-1.06,0-1.28-.62-1.34-.64-.07-.9.09-1.17,1.13-.27,1.04-.07,1.29.63,1.38Z"/>
            <path className="bt-5" d="M98.39,37.37s.02-.04.03-.05c-.91-1.39-1.7-2.82-2.36-4.29.7,0,1.4-.03,2.1-.1.32.78.66,1.56,1.03,2.32.08.18.16.37.24.55.01,0,.02,0,.03,0,.05-.2.1-.41.15-.62.24-.85.44-1.71.61-2.57.65-.13,1.29-.3,1.92-.5-.37,1.66-.9,3.32-1.59,4.96-.47,1.04-1.41,1.59-2.83,1.68-.47.03-.92,0-1.29-.08.1-.31.19-.62.28-.93.23.05.44.07.68.06.44-.02.81-.13,1-.42Z"/>
            <path className="bt-5" d="M104.2,36.28c-.81.28-1.54.41-2.14.37.03-.39.06-.78.08-1.16.55.05,1.32-.1,1.82-.28.51-.18.71-.41.67-.59-.12-.53-2.79.7-2.97-.93-.09-.83.54-1.6,2.04-2.2.57-.23,1.14-.4,1.62-.47.07.37.13.73.2,1.1-.5.09-1.15.31-1.56.47-.38.15-.54.31-.51.48.13.61,2.53-.78,2.98.63.28.89-.29,1.9-2.22,2.6Z"/>
          </g>
          <path className="bt-5" d="M50.97,21.87c.1-1.09.54-2.04,1.25-2.83-.55-1.03-1.64-1.73-3.25-2.11v-.05c2.04-.67,3.43-1.93,3.62-3.89.29-2.95-2.42-4.81-8.1-4.81h-10.36l-1.8,18.58h10.29c4.28,0,7.06-.9,8.58-2.45-.25-.72-.33-1.53-.24-2.44ZM45.67,20.94c-.14,1.46-.81,1.86-2.54,1.86h-3.73l.35-3.67h3.59c1.94,0,2.45.52,2.33,1.81ZM45.9,13.83c-.12,1.26-.73,1.69-2.31,1.69h-3.49l.32-3.27h3.42c1.62,0,2.18.37,2.07,1.59Z"/>
        </g>
        <g>
          <g>
            <path className="bt-4" d="M12.87,14.28c-1.27-1.59-5.62-6.21-6.48-7.51-2.35,2.55-3.78,5.96-3.78,9.7,0,2.73.76,5.28,2.08,7.45,6.9-6.67,10.51-6.71,8.18-9.64Z"/>
            <path className="bt-3" d="M20.3,20.71c-.21,3.3-.57,7.05-.87,9.89,6.74-1.18,11.86-7.05,11.86-14.12,0-1.51-.23-2.96-.67-4.33-4.87,3.59-10.03,3.84-10.32,8.56Z"/>
            <path className="bt-1" d="M15.99,22.23c-.96-2.6-6.72.26-10.68,2.61,2.6,3.62,6.85,5.97,11.64,5.97.42,0,.84-.02,1.26-.06-.54-2.75-1.37-6.22-2.22-8.53Z"/>
          </g>
          <path className="bt-5" d="M16.95,2.13c-4.08,0-7.76,1.71-10.37,4.44.21.14.53.37.98.73,9.15,7.36,18.66,5.48,22.8,4.09-2.05-5.42-7.28-9.27-13.42-9.27ZM22.98,9.01c-.27,1.73-1.88,2.92-3.58,2.65-1.7-.27-2.86-1.89-2.59-3.63.27-1.73,1.88-2.92,3.58-2.65,1.7.27,2.86,1.89,2.59,3.63Z"/>
          <path className="bt-5" d="M18.73,9.85c-.58-.13-1.09-.38-1.48-.7.09.8.61,1.46,1.34,1.62s1.54-.25,1.95-.98c-.53.17-1.17.21-1.82.06Z"/>
        </g>
      </g>
    </svg>
  )
}

export default function Carteirinha() {
  const { id } = useParams()
  const cardRef = useRef(null)
  const [piloto, setPiloto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [baixando, setBaixando] = useState(false)

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('pilotos')
        .select('*')
        .eq('id', id)
        .single()

      if (!error) setPiloto(data)
      setLoading(false)
    }
    load()
  }, [id])

  async function handleDownload() {
    if (!cardRef.current) return
    setBaixando(true)
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, cacheBust: true })
      const link = document.createElement('a')
      link.download = `carteirinha-${piloto?.crianca_nome || 'mirim'}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error(err)
    } finally {
      setBaixando(false)
    }
  }

  if (loading) {
    return (
      <div className="screen">
        <div className="center-text">
          <div className="loading-spin" />
          <p style={{ fontWeight: 700 }}>Preparando a carteirinha...</p>
        </div>
      </div>
    )
  }

  if (!piloto) {
    return (
      <div className="screen">
        <div className="panel center-text">
          <h1 className="title">N&atilde;o encontramos essa carteirinha {'\ud83d\ude15'}</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <div className="card-wrap">
        <div className="eyebrow center-text" style={{ justifyContent: 'center' }}>
          {'\ud83c\udf89'} Carteirinha aprovada!
        </div>
        <h1 className="title center-text" style={{ marginBottom: 20 }}>
          Parab&eacute;ns, Piloto {piloto.crianca_nome?.split(' ')[0]}!
        </h1>

        <div className="id-card" ref={cardRef}>
          <div className="id-top-band">
            <div className="id-brand">
              <BangtoysLogo height={30} />
              <div className="id-brand-sub" style={{ marginTop: 4 }}>
                CARRINHOS EL&Eacute;TRICOS PARA CRIAN&Ccedil;AS
              </div>
            </div>
            <div className="id-doc-title">
              <div className="main">CARTEIRINHA DE<br />MOTORISTA MIRIM</div>
              <div className="country">VRUUUM! {'\u2713'} APROVADO</div>
            </div>
          </div>

          <div className="id-body">
            <div className="id-photo-block">
              <div className="id-photo">
                {piloto.foto_url && <img src={piloto.foto_url} alt={piloto.crianca_nome} />}
              </div>
              <div className="id-mascot">{'\ud83c\udfc1'}</div>
            </div>

            <div className="id-info">
              <div className="id-field full">
                <div className="label">Nome do Piloto</div>
                <div className="value big">{piloto.crianca_nome}</div>
              </div>

              <div className="id-field">
                <div className="label">Nasceu em</div>
                <div className="value">{formatDate(piloto.crianca_nascimento)}</div>
              </div>

              <div className="id-field">
                <div className="label">Categoria</div>
                <div className="id-pill">{'\ud83d\udec8'} PILOTO MIRIM</div>
              </div>

              <div className="id-field">
                <div className="label">Carteirinha N&ordm;</div>
                <div className="value">{regNumber(piloto.id)}</div>
              </div>

              <div className="id-field">
                <div className="label">Validade</div>
                <div className="value">PRA SEMPRE {'\ud83d\udc9b'}</div>
              </div>
            </div>
          </div>

          <div className="id-footer">
            <div className="reg">
              <b>www.bangtoys.com.br</b>
              Carrinhos el&eacute;tricos oficiais
            </div>
            <div className="icons">
              <div className="icon-chip">{'\ud83d\udea6'}</div>
              <div className="icon-chip">{'\ud83d\uded1'}</div>
              <div className="icon-chip">{'\ud83c\udfc6'}</div>
            </div>
          </div>
        </div>

        <button className="btn btn-secondary" onClick={handleDownload} disabled={baixando}>
          {baixando ? 'Gerando imagem...' : '\u2b07\ufe0f Baixar carteirinha'}
        </button>

        <div className="upsell-box">
          <div className="upsell-title">{'\ud83c\udf81'} Deixa a carteirinha ainda mais top!</div>
          <p>
            Que tal um carrinho el&eacute;trico Bangtoys? Temos modelos incr&iacute;veis
            para o seu pequeno piloto arrasar com seguran&ccedil;a!
          </p>
          <button className="btn btn-yellow" style={{ marginTop: 0 }}>
            Ver carrinhos Bangtoys {'\ud83d\ude97'}
          </button>
        </div>
      </div>
    </div>
  )
}
