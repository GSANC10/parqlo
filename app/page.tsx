'use client'

import { useMemo, useState } from 'react'
import { SimpleSearchNavbar } from '@/components/SimpleSearchNavbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import { campuses, type CampusSlug } from '@/lib/campuses'

export default function LandingPage() {
  const [campus, setCampus] = useState<CampusSlug | null>(null)
  const campusObj = useMemo(() => {
    if (campus) {
      return campuses.find(c => c.slug === campus)!
    }
    return campuses[0]
  }, [campus])

  const goToCampus = () => {
    if (campus) {
      window.location.href = `/${campus}`
    }
  }

  const signInEdu = () => {
    window.location.href = '/login'
  }

  const listYourSpot = () => {
    window.location.href = '/list'
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      <SimpleSearchNavbar
        selectedCampus={campus}
        onCampusChange={(slug) => setCampus(slug as CampusSlug)}
      />

      <Hero
        campus={campusObj}
        onExploreCampus={goToCampus}
        onListSpot={listYourSpot}
      />

      <Stats />

      <Features />

      <HowItWorks />

      <Pricing
        campus={campusObj}
        onListSpot={listYourSpot}
        onBrowseCampus={goToCampus}
      />

      <FAQ />

      <Footer campuses={campuses} />
    </div>
  )
}
