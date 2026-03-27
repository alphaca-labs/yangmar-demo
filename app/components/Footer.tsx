import StaticLink from '@/components/StaticLink'

export default function Footer() {
  return (
    <footer className="border-t-2 border-[#333] mt-24 bg-[#0a0a0a]">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-pixel text-[10px] text-[#39FF14] mb-3">YANGMAR</h3>
            <p className="text-xs text-[#666] leading-relaxed">
              한 켤레를 사면, 한 켤레가 기부됩니다.
            </p>
          </div>

          <div>
            <h4 className="font-pixel text-[8px] text-[#FF69B4] mb-3">LINKS</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <StaticLink href="/products" className="text-[#666] hover:text-[#00FFFF] transition-colors">
                  shop
                </StaticLink>
              </li>
              <li>
                <StaticLink href="/donation" className="text-[#666] hover:text-[#00FFFF] transition-colors">
                  donation
                </StaticLink>
              </li>
              <li>
                <StaticLink href="/story" className="text-[#666] hover:text-[#00FFFF] transition-colors">
                  story
                </StaticLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-pixel text-[8px] text-[#FF69B4] mb-3">CONTACT</h4>
            <ul className="space-y-2 text-sm text-[#666]">
              <li>help@yangmar.com</li>
              <li>02-1234-5678</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#333] mt-10 pt-6 text-xs text-[#555]">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <p className="font-pixel text-[7px]">&copy; 2026 YANGMAR. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-4">
              <StaticLink href="/terms" className="hover:text-[#00FFFF] transition-colors">
                terms
              </StaticLink>
              <StaticLink href="/privacy" className="hover:text-[#00FFFF] transition-colors">
                privacy
              </StaticLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
