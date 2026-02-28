import './App.css'
import Hero from './components/Hero'
import Links from './components/Links'
import About from './components/About'
import Footer from './components/Footer'

export default function App() {
  return (
    <main className="min-h-screen bg-ink">
      <Hero />
      <Links />
      <About />
      <Footer />
    </main>
  )
}
