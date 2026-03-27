'use client'

import { useState } from 'react'
import StaticLink from '@/components/StaticLink'
import { useCartStore } from '@/store/cart'

export default function Header() {
  const items = useCartStore(state => state.items)
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-[#0a0a0a] border-b border-[#333]">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <StaticLink href="/" className="font-pixel text-sm text-neon-green tracking-tight hover:text-[#39FF14] transition-colors">
            YANGMAR
          </StaticLink>

          <nav className="hidden md:flex items-center gap-8">
            <StaticLink href="/products" className="text-sm text-[#888] hover:text-[#00FFFF] transition-colors uppercase tracking-wider">
              shop
            </StaticLink>
            <StaticLink href="/donation" className="text-sm text-[#888] hover:text-[#00FFFF] transition-colors uppercase tracking-wider">
              donation
            </StaticLink>
            <StaticLink href="/story" className="text-sm text-[#888] hover:text-[#00FFFF] transition-colors uppercase tracking-wider">
              story
            </StaticLink>
          </nav>

          <div className="flex items-center gap-4">
            <StaticLink
              href="/cart"
              className="relative text-sm text-[#888] hover:text-[#FF69B4] transition-colors uppercase tracking-wider"
            >
              cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-[#FF69B4] text-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-[0_0_8px_rgba(255,105,180,0.6)]">
                  {cartCount}
                </span>
              )}
            </StaticLink>

            <button
              className="md:hidden text-[#39FF14] ml-2 text-xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden pt-4 pb-2 border-t border-[#333] mt-4 flex flex-col gap-3">
            <StaticLink href="/products" className="text-sm text-[#888] hover:text-[#00FFFF] uppercase tracking-wider">
              shop
            </StaticLink>
            <StaticLink href="/donation" className="text-sm text-[#888] hover:text-[#00FFFF] uppercase tracking-wider">
              donation
            </StaticLink>
            <StaticLink href="/story" className="text-sm text-[#888] hover:text-[#00FFFF] uppercase tracking-wider">
              story
            </StaticLink>
          </nav>
        )}
      </div>
    </header>
  )
}
