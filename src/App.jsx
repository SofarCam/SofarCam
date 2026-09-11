import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Guides from './components/Guides'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/guides" element={<Guides />} />
    </Routes>
  )
}
