import Navbar from './Navbar'
import Hero from './Hero'
import SofarContent from './SofarContent'
import TrendingSection from './TrendingSection'
import Services from './Services'
import EmailCapture from './EmailCapture'
import Footer from './Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SofarContent />
        <TrendingSection />
        <Services />
        <EmailCapture />
      </main>
      <Footer />
    </>
  )
}
