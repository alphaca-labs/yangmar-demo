'use client'

import { AnchorHTMLAttributes } from 'react'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

interface StaticLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

/**
 * Static <a> link with basePath support.
 * Unlike next/link, this does a full page navigation (no RSC flight data fetch).
 * Required for GitHub Pages static hosting compatibility.
 */
export default function StaticLink({ href, children, ...props }: StaticLinkProps) {
  const fullHref = href.startsWith('/') ? `${basePath}${href}` : href
  return (
    <a href={fullHref} {...props}>
      {children}
    </a>
  )
}
