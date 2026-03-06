import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SofarContent from './components/SofarContent'
import ToolsPreview from './components/ToolsPreview'
import Services from './components/Services'
import Footer from './components/Footer'
import SectionDivider from './components/SectionDivider'
import TrendingSection from './components/TrendingSection'
import EmailCapture from './components/EmailCapture'

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
        <TrendingSection />
        <SectionDivider color="cyan" />
        <Services />
        <SectionDivider color="violet" />
        <EmailCapture />
        <Footer />
      </main>
    </>
  )
}
