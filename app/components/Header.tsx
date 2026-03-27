'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cart'


export default function Header() {
  const items = useCartStore(state => state.items)
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/images/yangmar-logo.png"
              alt="양마르" 
              width={40} 
              height={40}
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <span className="text-xl md:text-2xl font-bold">양마르</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/products" className="hover:text-gray-600 transition-colors">
              상품
            </Link>
            <Link href="/donation" className="hover:text-gray-600 transition-colors">
              기부 현황
            </Link>
            <Link href="/story" className="hover:text-gray-600 transition-colors">
              브랜드 스토리
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              href="/cart" 
              className="relative hover:text-gray-600 transition-colors"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
