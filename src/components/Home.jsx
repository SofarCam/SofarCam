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
