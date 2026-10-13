import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import useSmoothScroll from './hooks/useSmoothScroll'

export default function App() {
  useSmoothScroll()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
      </main>
    </div>
  )
}
