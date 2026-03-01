import './App.css'
import Card from './components/Card'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import Contact from './components/Contact'
import SofarContent from './components/SofarContent'

export default function App() {
  return (
    <main>
      <Card />
      <SofarContent />
      <Portfolio />
      <Services />
      <Contact />
    </main>
  )
}
