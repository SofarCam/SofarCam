import './App.css'
import Hero from './components/Hero'
import SofarContent from './components/SofarContent'
import Services from './components/Services'
import ToolsPreview from './components/ToolsPreview'
import Footer from './components/Footer'

export default function App() {
  return (
    <main>
      <Hero />
      <SofarContent />
      <ToolsPreview />
      <Services />
      <Footer />
    </main>
  )
}
