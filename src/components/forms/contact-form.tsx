"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, CheckCircle, AlertCircle } from "lucide-react"

interface FormData {
  name: string
  email: string
  company: string
  role: string
  service: string
  budget: string
  timeline: string
  message: string
}

const services = [
  "Bitcoin Education",
  "Developer Training", 
  "Strategic Consultancy",
  "Enterprise Development",
  "Tokenised Solutions",
  "Custom Solution"
]

const budgetRanges = [
  "Under $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000 - $250,000",
  "$250,000+",
  "Flexible"
]

const timelines = [
  "ASAP",
  "Within 3 months",
  "3-6 months",
  "6-12 months",
  "12+ months",
  "Flexible"
]

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    role: "",
    service: "",
    budget: "",
    timeline: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        company: "",
        role: "",
        service: "",
        budget: "",
        timeline: "",
        message: ""
      })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (submitStatus === "success") {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
            Thank you!
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            We&apos;ve received your consultation request and will get back to you within 24 hours.
          </p>
          <Button 
            onClick={() => setSubmitStatus("idle")}
            variant="outline"
            className="w-full"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Schedule Your Consultation</CardTitle>
        <CardDescription>
          Tell us about your project and we&apos;ll get back to you within 24 hours with next steps.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-light-elevated dark:border-dark-elevated rounded-lg bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                placeholder="John Smith"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-light-elevated dark:border-dark-elevated rounded-lg bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                placeholder="john@company.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-light-elevated dark:border-dark-elevated rounded-lg bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                placeholder="Your Company"
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                Your Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-light-elevated dark:border-dark-elevated rounded-lg bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                placeholder="CTO, VP Engineering, etc."
              />
            </div>
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
              Service of Interest
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-light-elevated dark:border-dark-elevated rounded-lg bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            >
              <option value="">Select a service</option>
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                Budget Range
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-light-elevated dark:border-dark-elevated rounded-lg bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              >
                <option value="">Select budget range</option>
                {budgetRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="timeline" className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-light-elevated dark:border-dark-elevated rounded-lg bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              >
                <option value="">Select timeline</option>
                {timelines.map(timeline => (
                  <option key={timeline} value={timeline}>{timeline}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
              Project Details *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-light-elevated dark:border-dark-elevated rounded-lg bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-brand-blue focus:border-transparent resize-none"
              placeholder="Tell us about your project, goals, and any specific requirements..."
            />
          </div>

          {submitStatus === "error" && (
            <div className="flex items-center p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-sm text-red-700 dark:text-red-300">
                There was an error submitting your form. Please try again.
              </span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  Send Consultation Request
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            
            <div className="flex items-center justify-center text-sm text-light-text-muted dark:text-dark-text-muted">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                Free Consultation
              </Badge>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}