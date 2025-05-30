import { Suspense } from "react"
import HeaderSection from "@/components/header-section"
import Navbar from "@/components/navbar"
import AboutEnhanced from "@/components/about-enhanced"
import WorkflowProcess from "@/components/workflow-process"
import SuccessStories from "@/components/success-stories"
import B2BFeatures from "@/components/b2b-features"
import PricingSection from "@/components/pricing-section"
import CallToAction from "@/components/call-to-action"
import Footer from "@/components/footer"
import TrustedCompaniesMarquee from "@/components/trusted-companies-marquee"
import { Loader } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-white" />
          </div>
        }
      >
        <HeaderSection />
        <AboutEnhanced />
        <WorkflowProcess />
        <B2BFeatures />
        <TrustedCompaniesMarquee />
        <PricingSection />
        <SuccessStories />
        <CallToAction />
        <Footer />
      </Suspense>
    </main>
  )
}
