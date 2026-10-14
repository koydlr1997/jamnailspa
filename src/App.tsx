import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import ServicesMarquee from './components/Services_marquee'
import ServicesMassage from './components/Services_massage'
import useSmoothScroll from './hooks/useSmoothScroll'

export default function App() {
  useSmoothScroll()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <ServicesMarquee />
        <ServicesMassage />
      </main>
    </div>
  )
}
