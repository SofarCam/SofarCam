import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SofarContent from './components/SofarContent'
import ToolsPreview from './components/ToolsPreview'
import Services from './components/Services'
import Footer from './components/Footer'
import SectionDivider from './components/SectionDivider'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionDivider color="cyan" />
        <ToolsPreview />
        <SectionDivider color="violet" />
        <SofarContent />
        <SectionDivider color="pink" />
        <Services />
        <Footer />
      </main>
    </>
  )
}
