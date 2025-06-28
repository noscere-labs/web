
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-light-bg via-light-bg to-light-elevated dark:from-dark-bg dark:via-dark-bg dark:to-dark-elevated">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_50%,transparent_75%)] dark:bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.1)_50%,transparent_75%)]"></div>

      <div className="container mx-auto px-4 py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-brand-blue/10 text-brand-blue border border-brand-blue/20 mb-8">
            <span>🚀 Get to know</span>
            <ArrowRight className="ml-2 h-3 w-3" />
          </div> */}

          <h1 className="text-5xl lg:text-7xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6 leading-tight">
            Leverage{" "}
            <span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
              Blockchain
            </span>{" "}
            <span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
              Command</span>{" "}Truth
          </h1>

          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
            We partner with enterprise clients to unlock blockchain&apos;s strategic value,
            turning emerging possibilities into competitive advantage through expert consultation, design, development and training.
          </p>
          {/* 
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <span>

                <Link href="/contact">
                  Schedule Consultation
                </Link>
              </span>
            </Button>
          </div>
           */}


        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent"></div>
    </section>
  )
}