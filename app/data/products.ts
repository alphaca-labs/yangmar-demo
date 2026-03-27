export interface Product {
  id: string
  name: string
  nameEn: string
  color: 'white' | 'black'
  price: number
  description: string
  material: string
  size: string
  washingInstructions: string
  madeIn: string
  images: string[]
  stock: number
}

export const MAX_STOCK = 750

export const products: Product[] = [
  {
    id: 'white-socks',
    name: '양마르 화이트',
    nameEn: 'white socks',
    color: 'white',
    price: 2990,
    description: '깔끔한 화이트. 어디에든 잘 어울리는 기본 중의 기본.',
    material: '면 80%, 폴리에스터 18%, 스판덱스 2%',
    size: '원사이즈 (230-280mm)',
    washingInstructions: '찬물 세탁, 건조기 사용 금지',
    madeIn: '대한민국',
    images: ['/images/sock-white.jpg'],
    stock: MAX_STOCK
  },
  {
    id: 'black-socks',
    name: '양마르 블랙',
    nameEn: 'black socks',
    color: 'black',
    price: 2990,
    description: '클래식 블랙. 무난하면서도 깊이 있는 한 켤레.',
    material: '면 80%, 폴리에스터 18%, 스판덱스 2%',
    size: '원사이즈 (230-280mm)',
    washingInstructions: '찬물 세탁, 건조기 사용 금지',
    madeIn: '대한민국',
    images: ['/images/sock-black.jpg'],
    stock: MAX_STOCK
  }
]

export const getProductById = (id: string) => products.find(p => p.id === id)
