import '../App.css'
import Navbar from './Navbar'
import Hero from './Hero'
import SofarContent from './SofarContent'
import ToolsPreview from './ToolsPreview'
import Services from './Services'
import Footer from './Footer'
import SectionDivider from './SectionDivider'
import TrendingSection from './TrendingSection'
import EmailCapture from './EmailCapture'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <ToolsPreview />
        <SectionDivider />
        <SofarContent />
        <SectionDivider />
        <TrendingSection />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <EmailCapture />
        <Footer />
      </main>
    </>
  )
}
