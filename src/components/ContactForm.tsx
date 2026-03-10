/*
  CONTACT FORM COMPONENT
  ======================
  A form with validation that opens a mailto: link on submit.

  KEY CONCEPTS:

  1. useState<T>(initialValue):
     `const [name, setName] = useState<string>('')`
     - `name` is the CURRENT value (starts as '')
     - `setName` is the SETTER function — call it to update the value
     - `<string>` is the generic type — tells TS what kind of value this state holds
     - When you call setName('Adithya'), React re-renders and `name` becomes 'Adithya'

  2. Event Types:
     `React.FormEvent<HTMLFormElement>` — the type for form submission events
     `React.ChangeEvent<HTMLInputElement>` — the type for input change events
     These give you autocomplete on properties like `e.target.value`

  3. Controlled Inputs:
     In React, form inputs are "controlled" — their value comes from state.
     `value={name}` makes the input display whatever `name` state holds.
     `onChange` fires on every keystroke and updates the state.
     This is a two-way binding: state → input display, input change → state update.
*/

import { useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import { siteMeta } from '../data/siteData'
import styles from './ContactForm.module.css'

export default function ContactForm() {
  // Each form field gets its own state variable
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [company, setCompany] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [status, setStatus] = useState<string>('')

  // Form submit handler — note the typed event parameter
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()  // Prevent the browser's default form submission (page reload)

    // Validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('Please complete Name, Email, and Message.')
      return
    }

    // Build mailto link
    const subject = encodeURIComponent(`Portfolio Inquiry - ${name}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\n\nMessage:\n${message}`
    )
    window.location.href = `mailto:${siteMeta.email}?subject=${subject}&body=${body}`
    setStatus('Draft email opened in your mail app.')
  }

  // Reusable change handler — ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // tells TS this handles both <input> and <textarea> elements
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setter: (value: string) => void
  ) => {
    setter(e.target.value)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
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

      <button className={styles.submitBtn} type="submit">
        Send Message
      </button>

      {/* Status message — only renders when status is non-empty */}
      {status && (
        <p className={styles.status} role="status" aria-live="polite">
          {status}
        </p>
      )}
    </form>
  )
}
