/*
  CONTACT FORM COMPONENT
  ======================
  Submits form data via Web3Forms API — no backend needed.
  Messages are delivered straight to your email inbox.

  Web3Forms: https://web3forms.com
  - Free, unlimited submissions
  - No server-side code required
  - Sends form data to the email tied to your access key
*/

import { useState, useRef } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import styles from './ContactForm.module.css'
import { isContentClean } from '../utils/contentFilter'

const WEB3FORMS_ACCESS_KEY = '11803f1c-9e45-4a78-8b66-886e5fc6935d'
const COOLDOWN_SECONDS = 60

export default function ContactForm() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [company, setCompany] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [cooldown, setCooldown] = useState<number>(0)
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startCooldown = () => {
    setCooldown(COOLDOWN_SECONDS)
    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current!)
          cooldownRef.current = null
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('Please complete Name, Email, and Message.')
      return
    }

    if (cooldown > 0) {
      setStatus(`Please wait ${cooldown} seconds before sending another message.`)
      return
    }

    // Content filter — block offensive/abusive submissions
    if (!isContentClean([name, email, company, message])) {
      setStatus('Your message could not be sent.')
      startCooldown()
      return
    }

    setSubmitting(true)
    setStatus('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio Inquiry - ${name}`,
          from_name: name,
          botcheck: '',
          name,
          email,
          company: company || 'N/A',
          message,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('Message sent successfully! I\'ll get back to you soon.')
        setName('')
        setEmail('')
        setCompany('')
        setMessage('')
        startCooldown()
      } else {
        setStatus('Something went wrong. Please try again.')
      }
    } catch {
      setStatus('Network error. Please try again later.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setter: (value: string) => void
  ) => {
    setter(e.target.value)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Honeypot field — hidden from humans, catches bots that auto-fill everything */}
      <input
        type="checkbox"
        name="botcheck"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      <label htmlFor="contact-name">Name</label>
      <input
        id="contact-name"
        type="text"
        autoComplete="name"
        required
        value={name}
        onChange={(e) => handleChange(e, setName)}
      />

      <label htmlFor="contact-email">Email</label>
      <input
        id="contact-email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => handleChange(e, setEmail)}
      />

      <label htmlFor="contact-company">Company</label>
      <input
        id="contact-company"
        type="text"
        autoComplete="organization"
        value={company}
        onChange={(e) => handleChange(e, setCompany)}
      />

      <label htmlFor="contact-message">Message</label>
      <textarea
        id="contact-message"
        rows={5}
        required
        value={message}
        onChange={(e) => handleChange(e, setMessage)}
      />

      <button className={styles.submitBtn} type="submit" disabled={submitting || cooldown > 0}>
        {submitting ? 'Sending...' : cooldown > 0 ? `Wait ${cooldown}s` : 'Send Message'}
      </button>

      {status && (
        <p className={styles.status} role="status" aria-live="polite">
          {status}
        </p>
      )}
    </form>
  )
}
