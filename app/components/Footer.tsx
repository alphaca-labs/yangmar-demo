import StaticLink from '@/components/StaticLink'

export default function Footer() {
  return (
    <footer className="border-t border-[#E0E0E0] mt-24">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-bold mb-3">yangmar</h3>
            <p className="text-xs text-[#666] leading-relaxed">
              한 켤레를 사면, 한 켤레가 기부됩니다.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold mb-3 text-[#666] uppercase tracking-wider">links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <StaticLink href="/products" className="text-[#666] hover:text-[#1A1A1A] transition-colors">
                  shop
                </StaticLink>
              </li>
              <li>
                <StaticLink href="/donation" className="text-[#666] hover:text-[#1A1A1A] transition-colors">
                  donation
                </StaticLink>
              </li>
              <li>
                <StaticLink href="/story" className="text-[#666] hover:text-[#1A1A1A] transition-colors">
                  story
                </StaticLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold mb-3 text-[#666] uppercase tracking-wider">contact</h4>
            <ul className="space-y-2 text-sm text-[#666]">
              <li>help@yangmar.com</li>
              <li>02-1234-5678</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E0E0E0] mt-10 pt-6 text-xs text-[#999]">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <p>&copy; 2026 yangmar. all rights reserved.</p>
            <div className="flex gap-4">
              <StaticLink href="/terms" className="hover:text-[#666] transition-colors">
                terms
              </StaticLink>
              <StaticLink href="/privacy" className="hover:text-[#666] transition-colors">
                privacy
              </StaticLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
