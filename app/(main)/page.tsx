import { Navbar, Footer } from '@/components/layout'
import { Hero, FeaturedMess, CuisineFilter, HowItWorks, CTASection, Testimonials } from '@/components/home'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <CuisineFilter />
      <FeaturedMess />
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  )
}
