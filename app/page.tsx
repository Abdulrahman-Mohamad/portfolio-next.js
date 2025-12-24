import Hero from '@/sections/Hero'
import MyProject from '@/sections/MyProject'
import LogoSection from '@/sections/LogoSection'
import FeatureCards from '@/sections/FeatureCards'
import ExperienceSection from '@/sections/ExperienceSection'
import TechStack from '@/sections/TechStack'
import Testimonials from '@/sections/Testimonials'
import Contact from '@/sections/Contact'

export default function Home() {
  return <>
    <div className='space-y-20'>
      <Hero />
      <MyProject />
      <LogoSection />
      <FeatureCards />
      <ExperienceSection />
      <TechStack />
      <Testimonials />
      <Contact />
    </div>
  </>
}
