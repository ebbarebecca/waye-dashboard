'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { href: '/', label: 'ÖVERSIKT' },
  { href: '/customers', label: 'KUNDER' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(true)

  return (
    <aside
      className="flex flex-col h-screen sticky top-0 border-r transition-all duration-300"
      style={{
        width: expanded ? 240 : 64,
        borderColor: 'rgba(255,255,255,0.08)',
        backgroundColor: '#0a0a0a',
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center h-16 px-4 border-b shrink-0"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <Image
            src="https://images.squarespace-cdn.com/content/v1/66e926ef653bb57ad8d04927/d7d9511f-393d-4a6a-b529-36181a821169/Waye+white+circle.png?format=300w"
            alt="Waye Digital"
            width={32}
            height={32}
            className="shrink-0"
            unoptimized
          />
          {expanded && (
            <span
              className="text-white font-sans text-sm font-medium tracking-widest uppercase overflow-hidden whitespace-nowrap"
              style={{ letterSpacing: '0.15em' }}
            >
              WAYE
            </span>
          )}
        </Link>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="absolute -right-3 top-5 z-10 w-6 h-6 flex items-center justify-center border"
        style={{
          backgroundColor: '#1a1a1a',
          borderColor: 'rgba(255,255,255,0.08)',
          color: '#A0A0A0',
        }}
        aria-label={expanded ? 'Minimera sidebar' : 'Expandera sidebar'}
      >
        <span className="text-xs">{expanded ? '‹' : '›'}</span>
      </button>

      {/* Navigation */}
      <nav className="flex-1 py-8 overflow-hidden">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center h-10 px-4 text-xs transition-colors relative group"
                  style={{
                    letterSpacing: '0.15em',
                    color: isActive ? '#C4847A' : '#A0A0A0',
                    borderLeft: isActive
                      ? '2px solid #C4847A'
                      : '2px solid transparent',
                  }}
                >
                  {!expanded && (
                    <span className="text-base leading-none">
                      {item.label[0]}
                    </span>
                  )}
                  {expanded && (
                    <span className="whitespace-nowrap">{item.label}</span>
                  )}
                  {!expanded && (
                    <span
                      className="absolute left-16 px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50 transition-opacity"
                      style={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#ffffff',
                        letterSpacing: '0.15em',
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Consultant footer */}
      <div
        className="border-t p-4 shrink-0"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 flex items-center justify-center shrink-0 text-xs font-medium"
            style={{
              backgroundColor: 'rgba(196,132,122,0.15)',
              border: '1px solid rgba(196,132,122,0.4)',
              color: '#C4847A',
            }}
          >
            FA
          </div>
          {expanded && (
            <div className="overflow-hidden">
              <p className="text-xs text-white font-medium whitespace-nowrap">
                Fredrik Angin
              </p>
              <p
                className="text-xs whitespace-nowrap"
                style={{ color: '#A0A0A0' }}
              >
                Senior Consultant
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
