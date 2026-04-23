import { useEffect } from 'react'

interface SeoMeta {
  title: string
  description: string
  canonical: string
  ogTitle?: string
  ogDescription?: string
  schema?: object
}

function setMetaTag(attr: string, key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

let pageSchemaEl: HTMLScriptElement | null = null

function setPageSchema(data: object) {
  if (!pageSchemaEl) {
    pageSchemaEl = document.querySelector<HTMLScriptElement>('script[data-seo="page"]')
  }
  if (!pageSchemaEl) {
    pageSchemaEl = document.createElement('script')
    pageSchemaEl.type = 'application/ld+json'
    pageSchemaEl.setAttribute('data-seo', 'page')
    document.head.appendChild(pageSchemaEl)
  }
  pageSchemaEl.textContent = JSON.stringify(data)
}

function removePageSchema() {
  if (pageSchemaEl) {
    pageSchemaEl.remove()
    pageSchemaEl = null
  }
}

export function useSeoMeta({ title, description, canonical, ogTitle, ogDescription, schema }: SeoMeta) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title
    setMetaTag('name', 'description', description)
    setCanonical(canonical)
    setMetaTag('property', 'og:title', ogTitle ?? title)
    setMetaTag('property', 'og:description', ogDescription ?? description)
    setMetaTag('property', 'og:url', canonical)
    setMetaTag('name', 'twitter:title', ogTitle ?? title)
    setMetaTag('name', 'twitter:description', ogDescription ?? description)
    if (schema) {
      setPageSchema(schema)
    } else {
      removePageSchema()
    }

    return () => {
      document.title = prevTitle
    }
  }, [title, description, canonical, ogTitle, ogDescription, schema])
}
