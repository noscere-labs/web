import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-brand-blue to-brand-purple relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)]"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join the enterprises already leveraging blockchain technology to drive innovation, 
            reduce costs, and create new revenue streams. Let&apos;s discuss your blockchain strategy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="secondary"
              asChild 
              className="w-full sm:w-auto bg-white text-brand-blue hover:bg-gray-100"
            >
              <Link href="/contact">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Consultation
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-brand-blue"
            >
              <Link href="/services">
                Explore Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-100">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
              <span className="text-sm">Free initial consultation</span>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
              <span className="text-sm">No long-term commitments</span>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
              <span className="text-sm">Enterprise-grade security</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}