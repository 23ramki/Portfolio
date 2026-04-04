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

import { useState, useRef, useEffect } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import styles from './ContactForm.module.css'
import { isContentClean } from '../utils/contentFilter'

const WEB3FORMS_ACCESS_KEY = '11803f1c-9e45-4a78-8b66-886e5fc6935d'
const COOLDOWN_SECONDS = 60
const COOLDOWN_KEY = 'portfolio-contact-cooldown-until'

function getRemainingCooldown(): number {
  const stored = localStorage.getItem(COOLDOWN_KEY)
  if (!stored) return 0
  const remaining = Math.ceil((parseInt(stored, 10) - Date.now()) / 1000)
  return remaining > 0 ? remaining : 0
}

export default function ContactForm() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [company, setCompany] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('')
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [cooldown, setCooldown] = useState<number>(getRemainingCooldown)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Resume cooldown on mount if there's time remaining
  useEffect(() => {
    const remaining = getRemainingCooldown()
    if (remaining > 0) {
      setCooldown(remaining)
      cooldownRef.current = setInterval(() => {
        const r = getRemainingCooldown()
        setCooldown(r)
        if (r <= 0) {
          clearInterval(cooldownRef.current!)
          cooldownRef.current = null
          localStorage.removeItem(COOLDOWN_KEY)
        }
      }, 1000)
    }
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current)
    }
  }, [])

  const startCooldown = () => {
    const until = Date.now() + COOLDOWN_SECONDS * 1000
    localStorage.setItem(COOLDOWN_KEY, until.toString())
    setCooldown(COOLDOWN_SECONDS)
    if (cooldownRef.current) clearInterval(cooldownRef.current)
    cooldownRef.current = setInterval(() => {
      const remaining = getRemainingCooldown()
      setCooldown(remaining)
      if (remaining <= 0) {
        clearInterval(cooldownRef.current!)
        cooldownRef.current = null
        localStorage.removeItem(COOLDOWN_KEY)
      }
    }, 1000)
  }

  const validateField = (field: string, value: string): string => {
    if (field === 'name' && !value.trim()) return 'Name is required.'
    if (field === 'email') {
      if (!value.trim()) return 'Email is required.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email.'
    }
    if (field === 'message' && !value.trim()) return 'Message is required.'
    return ''
  }

  const handleBlur = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const error = validateField(field, value)
    setFieldErrors((prev) => ({ ...prev, [field]: error }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate all required fields
    const errors: Record<string, string> = {
      name: validateField('name', name),
      email: validateField('email', email),
      message: validateField('message', message),
    }
    setFieldErrors(errors)
    setTouched({ name: true, email: true, message: true })

    const hasErrors = Object.values(errors).some(Boolean)
    if (hasErrors) {
      setStatus('Please fix the errors above.')
      setStatusType('error')
      return
    }

    if (cooldown > 0) {
      setStatus(`Please wait ${cooldown} seconds before sending another message.`)
      setStatusType('error')
      return
    }

    // Content filter — block offensive/abusive submissions
    if (!isContentClean([name, email, company, message])) {
      setStatus('Your message could not be sent.')
      setStatusType('error')
      startCooldown()
      return
    }

    setSubmitting(true)
    setStatus('')
    setStatusType('')

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
        setStatusType('success')
        setName('')
        setEmail('')
        setCompany('')
        setMessage('')
        setFieldErrors({})
        setTouched({})
        startCooldown()
      } else {
        setStatus('Something went wrong. Please try again.')
        setStatusType('error')
      }
    } catch {
      setStatus('Network error. Please try again later.')
      setStatusType('error')
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
        onBlur={() => handleBlur('name', name)}
        aria-invalid={touched.name && !!fieldErrors.name}
        aria-describedby={fieldErrors.name ? 'error-name' : undefined}
      />
      {touched.name && fieldErrors.name && (
        <p id="error-name" className={styles.fieldError}>{fieldErrors.name}</p>
      )}

      <label htmlFor="contact-email">Email</label>
      <input
        id="contact-email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => handleChange(e, setEmail)}
        onBlur={() => handleBlur('email', email)}
        aria-invalid={touched.email && !!fieldErrors.email}
        aria-describedby={fieldErrors.email ? 'error-email' : undefined}
      />
      {touched.email && fieldErrors.email && (
        <p id="error-email" className={styles.fieldError}>{fieldErrors.email}</p>
      )}

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
        onBlur={() => handleBlur('message', message)}
        aria-invalid={touched.message && !!fieldErrors.message}
        aria-describedby={fieldErrors.message ? 'error-message' : undefined}
      />
      {touched.message && fieldErrors.message && (
        <p id="error-message" className={styles.fieldError}>{fieldErrors.message}</p>
      )}

      <button className={styles.submitBtn} type="submit" disabled={submitting}>
        {submitting ? 'Sending...' : cooldown > 0 ? `Wait ${cooldown}s` : 'Send Message'}
      </button>

      {status && (
        <p className={`${styles.status} ${statusType === 'success' ? styles.statusSuccess : statusType === 'error' ? styles.statusError : ''}`} role="status" aria-live="polite">
          <span aria-hidden="true">{statusType === 'success' ? '\u2713 ' : statusType === 'error' ? '\u2717 ' : ''}</span>
          {status}
        </p>
      )}
    </form>
  )
}
