import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cadastro from './pages/Cadastro.jsx'
import Quiz from './pages/Quiz.jsx'
import Foto from './pages/Foto.jsx'
import Carteirinha from './pages/Carteirinha.jsx'
import Admin from './pages/Admin.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/foto/:id" element={<Foto />} />
        <Route path="/carteirinha/:id" element={<Carteirinha />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
