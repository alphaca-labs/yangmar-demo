'use client'

import StaticLink from '@/components/StaticLink'
import Image from 'next/image'
import { useCartStore } from '@/store/cart'


export default function Header() {
  const items = useCartStore(state => state.items)
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <StaticLink href="/" className="flex items-center gap-2">
            <Image 
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/yangmar-logo.png`}
              alt="양마르" 
              width={40} 
              height={40}
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <span className="text-xl md:text-2xl font-bold">양마르</span>
          </StaticLink>

          <nav className="hidden md:flex items-center gap-6">
            <StaticLink href="/products" className="hover:text-gray-600 transition-colors">
              상품
            </StaticLink>
            <StaticLink href="/donation" className="hover:text-gray-600 transition-colors">
              기부 현황
            </StaticLink>
            <StaticLink href="/story" className="hover:text-gray-600 transition-colors">
              브랜드 스토리
            </StaticLink>
          </nav>

          <div className="flex items-center gap-4">
            <StaticLink 
              href="/cart" 
              className="relative hover:text-gray-600 transition-colors"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </StaticLink>
          </div>
        </div>
      </div>
    </header>
  )
}
