'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

interface ContactClientProps {
  pageData?: any
  siteSettings?: any
}

export default function ContactClient({ pageData, siteSettings }: ContactClientProps) {
  const { t, locale } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    alert(
      locale === 'en'
        ? t.contact?.messageSent || 'Message sent! We will contact you within 24 hours.'
        : t.contact?.messageSent || 'Bericht verzonden! Wij nemen binnen 24 uur contact met u op.',
    )
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const hero = pageData?.hero || {
    title: t.contact?.title || (locale === 'en' ? 'GET INUCH' : 'NEEM CONTACT OP'),
    description:
      t.contact?.description ||
      (locale === 'en'
        ? 'Do you have a demolition or dismantling project? Feel free to contact us for a quote or advice. We respond within 24 hours.'
        : 'Heeft u een sloop- of demontageproject? Neem vrijblijvend contact met ons op voor een offerte of advies. Wij reageren binnen 24 uur.'),
  }

  const contact = siteSettings?.contact || {
    phone: t.contact?.phone || '06-12345678',
    email: locale === 'en' ? 'info@titanbreakers.nl' : 'info@titaanbrekers.nl',
    address: t.contact?.address || 'Industrieweg 45\n1234 AB Rotterdam',
    hours:
      locale === 'en'
        ? t.contact?.hours || 'Monday - Friday: 07:00 - 18:00'
        : t.contact?.hours || 'Maandag - Vrijdag: 07:00 - 18:00',
  }

  const formTitle =
    pageData?.formSettings?.title ||
    t.contact?.formTitle ||
    (locale === 'en' ? 'SEND A MESSAGE' : 'STUUR EEN BERICHT')
  const subjects = pageData?.formSettings?.subjects || [
    { value: 'offerte', label: locale === 'en' ? 'Request Quote' : 'Offerte aanvragen' },
    {
      value: 'informatie',
      label: locale === 'en' ? 'Request Information' : 'Informatie aanvragen',
    },
    { value: 'samenwerking', label: locale === 'en' ? 'Partnership' : 'Samenwerking' },
    { value: 'anders', label: locale === 'en' ? 'Other' : 'Anders' },
  ]

  const certifications = siteSettings?.certifications?.map((c: any) => c.name) || [
    'VCA**',
    'SC-530',
    'ISO 9001',
    'ISO 14001',
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 mb-6">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                {locale === 'en' ? 'Contact' : 'Contact'}
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl mb-4">
              {hero.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-gradient">{hero.title.split(' ').slice(-1)}</span>
            </h1>
            <p className="text-muted-foreground text-lg">{hero.description}</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="font-display text-3xl mb-8 text-foreground">
                {locale === 'en' ? 'CONTACT DETAILS' : 'CONTACTGEGEVENS'}
              </h2>

              <div className="space-y-6">
                <div className="card-industrial flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {locale === 'en' ? 'Address' : 'Adres'}
                    </h3>
                    <p className="text-muted-foreground whitespace-pre-line">{contact.address}</p>
                  </div>
                </div>

                <div className="card-industrial flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {locale === 'en' ? 'Phone' : 'Telefoon'}
                    </h3>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>

                <div className="card-industrial flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {locale === 'en' ? 'Email' : 'E-mail'}
                    </h3>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="card-industrial flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {locale === 'en' ? 'Opening Hours' : 'Openingstijden'}
                    </h3>
                    <p className="text-muted-foreground whitespace-pre-line">{contact.hours}</p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="mt-10">
                <h3 className="font-display text-xl mb-4 text-foreground">
                  {locale === 'en' ? 'CERTIFICATIONS' : 'CERTIFICERINGEN'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {certifications.map((cert: string) => (
                    <div key={cert} className="flex items-center gap-2 bg-primary/10 px-3 py-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card-industrial p-8">
                <h2 className="font-display text-3xl mb-6 text-foreground">{formTitle}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {locale === 'en' ? 'Name *' : 'Naam *'}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                        placeholder={locale === 'en' ? 'Your name' : 'Uw naam'}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {locale === 'en' ? 'Email *' : 'E-mail *'}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                        placeholder={locale === 'en' ? 'your@email.com' : 'uw@email.nl'}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {locale === 'en' ? 'Phone Number' : 'Telefoonnummer'}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                        placeholder="06-12345678"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {locale === 'en' ? 'Subject *' : 'Onderwerp *'}
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border text-foreground focus:border-primary focus:outline-none transition-colors"
                      >
                        <option value="">
                          {locale === 'en' ? 'Select subject' : 'Selecteer onderwerp'}
                        </option>
                        {subjects.map((subj: any) => (
                          <option key={subj.value} value={subj.value}>
                            {subj.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {locale === 'en' ? 'Message *' : 'Bericht *'}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder={
                        locale === 'en'
                          ? 'Describe your project or question...'
                          : 'Beschrijf uw project of vraag...'
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-power w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      locale === 'en' ? (
                        'Sending...'
                      ) : (
                        'Verzenden...'
                      )
                    ) : (
                      <>
                        {locale === 'en' ? 'Send Message' : 'Bericht Verzenden'}
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
