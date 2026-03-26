import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">양마르</h3>
            <p className="text-sm text-gray-300">
              한 켤레를 사면, 한 켤레가 기부됩니다.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">바로가기</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
                  상품
                </Link>
              </li>
              <li>
                <Link href="/donation" className="text-gray-300 hover:text-white transition-colors">
                  기부 현황
                </Link>
              </li>
              <li>
                <Link href="/story" className="text-gray-300 hover:text-white transition-colors">
                  브랜드 스토리
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">고객센터</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>이메일: help@yangmar.com</li>
              <li>전화: 02-1234-5678</li>
              <li>운영시간: 평일 09:00 - 18:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <p>© 2026 YANGMAR. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/terms" className="hover:text-white transition-colors">
                이용약관
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                개인정보처리방침
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
