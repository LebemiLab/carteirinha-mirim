import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { QUIZ_QUESTIONS } from '../lib/quizData'

export default function Quiz() {
  const { id } = useParams(); const navigate = useNavigate()
  const [current, setCurrent] = useState(0); const [acertos, setAcertos] = useState(0); const [loading, setLoading] = useState(false)
  const question = QUIZ_QUESTIONS[current]; const isLast = current === QUIZ_QUESTIONS.length - 1; const letters = ['A','B','C']

  async function handleAnswer(opt) {
    const novoAcertos = opt.correct ? acertos + 1 : acertos
    if (isLast) {
      setLoading(true)
      try { await supabase.from('pilotos').update({ quiz_acertos: novoAcertos, status: 'quiz_concluido' }).eq('id', id) }
      catch (err) { console.error(err) }
      finally { setLoading(false); navigate('/foto/' + id) }
    } else { setAcertos(novoAcertos); setCurrent(c => c + 1) }
  }

  return (
    <div className="screen">
      <div className="panel">
        <div className="quiz-progress">
          {QUIZ_QUESTIONS.map((q, i) => <div key={q.id} className={'dot' + (i < current ? ' done' : '') + (i === current ? ' current' : '')} />)}
        </div>
        <div className="quiz-emoji">{question.emoji}</div>
        <div className="quiz-question">{question.question}</div>
        {question.options.map((opt, i) => (
          <button key={i} className="quiz-option" onClick={() => handleAnswer(opt)} disabled={loading}>
            <span className="opt-letter">{letters[i]}</span>{opt.text}
          </button>
        ))}
        <p style={{textAlign:'center',fontSize:13,color:'#9C8F6B',fontWeight:700,marginTop:16}}>Pergunta {current+1} de {QUIZ_QUESTIONS.length}</p>
      </div>
    </div>
  )
}
