'use client'

import { useState } from 'react'
import StaticLink from '@/components/StaticLink'
import { useCartStore } from '@/store/cart'

export default function Header() {
  const items = useCartStore(state => state.items)
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-[#E0E0E0]">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <StaticLink href="/" className="text-xl font-bold tracking-tight">
            yangmar
          </StaticLink>

          <nav className="hidden md:flex items-center gap-8">
            <StaticLink href="/products" className="text-sm text-[#666] hover:text-[#1A1A1A] transition-colors">
              shop
            </StaticLink>
            <StaticLink href="/donation" className="text-sm text-[#666] hover:text-[#1A1A1A] transition-colors">
              donation
            </StaticLink>
            <StaticLink href="/story" className="text-sm text-[#666] hover:text-[#1A1A1A] transition-colors">
              story
            </StaticLink>
          </nav>

          <div className="flex items-center gap-4">
            <StaticLink
              href="/cart"
              className="relative text-sm text-[#666] hover:text-[#1A1A1A] transition-colors"
            >
              cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-[#1A1A1A] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </StaticLink>

            <button
              className="md:hidden text-[#1A1A1A] ml-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden pt-4 pb-2 border-t border-[#E0E0E0] mt-4 flex flex-col gap-3">
            <StaticLink href="/products" className="text-sm text-[#666] hover:text-[#1A1A1A]">
              shop
            </StaticLink>
            <StaticLink href="/donation" className="text-sm text-[#666] hover:text-[#1A1A1A]">
              donation
            </StaticLink>
            <StaticLink href="/story" className="text-sm text-[#666] hover:text-[#1A1A1A]">
              story
            </StaticLink>
          </nav>
        )}
      </div>
    </header>
  )
}
