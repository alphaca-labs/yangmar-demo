export interface Product {
  id: string
  name: string
  price: number
  description: string
  material: string
  size: string
  washingInstructions: string
  madeIn: string
  images: string[]
  bestSeller?: boolean
}

export const products: Product[] = [
  {
    id: 'basic-black',
    name: '양마르 베이직 블랙',
    price: 2990,
    description: '심플하고 클래식한 블랙 양말. 어떤 옷에도 잘 어울립니다.',
    material: '면 80%, 폴리에스터 18%, 스판덱스 2%',
    size: '프리사이즈 (250-280mm)',
    washingInstructions: '찬물 세탁, 건조기 사용 금지',
    madeIn: '대한민국',
    images: ['/images/sock-black.jpg'],
    bestSeller: true
  },
  {
    id: 'basic-white',
    name: '양마르 베이직 화이트',
    price: 2990,
    description: '깨끗한 화이트 양말. 스니커즈와 완벽한 조합.',
    material: '면 80%, 폴리에스터 18%, 스판덱스 2%',
    size: '프리사이즈 (250-280mm)',
    washingInstructions: '찬물 세탁, 건조기 사용 금지',
    madeIn: '대한민국',
    images: ['/images/sock-white.jpg'],
    bestSeller: true
  },
  {
    id: 'basic-gray',
    name: '양마르 베이직 그레이',
    price: 2990,
    description: '은은한 그레이 톤. 깔끔하고 세련된 스타일.',
    material: '면 80%, 폴리에스터 18%, 스판덱스 2%',
    size: '프리사이즈 (250-280mm)',
    washingInstructions: '찬물 세탁, 건조기 사용 금지',
    madeIn: '대한민국',
    images: ['/images/sock-gray.jpg'],
    bestSeller: false
  },
  {
    id: 'stripe-black',
    name: '양마르 스트라이프 블랙',
    price: 3490,
    description: '포인트 스트라이프가 들어간 블랙 양말.',
    material: '면 75%, 폴리에스터 23%, 스판덱스 2%',
    size: '프리사이즈 (250-280mm)',
    washingInstructions: '찬물 세탁, 건조기 사용 금지',
    madeIn: '대한민국',
    images: ['/images/sock-stripe.jpg'],
    bestSeller: false
  }
]

export const getProductById = (id: string) => products.find(p => p.id === id)
export const getBestSellers = () => products.filter(p => p.bestSeller)
