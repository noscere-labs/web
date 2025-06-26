import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-light-bg via-light-bg to-light-elevated dark:from-dark-bg dark:via-dark-bg dark:to-dark-elevated">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_50%,transparent_75%)] dark:bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.1)_50%,transparent_75%)]"></div>
      
      <div className="container mx-auto px-4 py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-brand-blue/10 text-brand-blue border border-brand-blue/20 mb-8">
            <span>🚀 Trusted by Leading Enterprises</span>
            <ArrowRight className="ml-2 h-3 w-3" />
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6 leading-tight">
            Demystifying{" "}
            <span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
              Blockchain
            </span>{" "}
            for Enterprise
          </h1>
          
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
            We partner with enterprise clients to unlock blockchain&apos;s strategic value, 
            turning emerging possibilities into competitive advantages through expert consultation and training.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/contact">
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-center">
              <div className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">50+</div>
              <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Enterprise Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">500+</div>
              <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Developers Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">$100M+</div>
              <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Value Unlocked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">5</div>
              <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent"></div>
    </section>
  )
}