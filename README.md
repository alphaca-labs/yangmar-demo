# 양마르(YANGMAR) 자사몰 데모

> 1구매 = 1기부, 캐주얼 양말 쇼핑몰 데모

## 프로젝트 개요

양마르는 "한 켤레를 사면, 한 켤레가 기부됩니다" 컨셉의 소셜 임팩트 양말 브랜드 데모입니다.

- **타겟**: 10~30대 남성
- **핵심 가치**: 구매를 통한 자연스러운 기부 경험
- **특징**: 3D 기부통, 실시간 기부 카운터, 기부 인증서

## 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **스타일링**: Tailwind CSS
- **3D**: Three.js + React Three Fiber + @react-three/rapier
- **애니메이션**: Framer Motion
- **상태관리**: Zustand
- **배포**: Vercel

## 구현된 기능

### ✅ 완료된 페이지

1. **메인 (랜딩)** - 히어로, 3D 기부통, 베스트셀러, 브랜드 스토리 티저
2. **전체 상품** - 상품 리스트 그리드
3. **상품 상세** - 번들 선택, 수량 선택, 실시간 기부량 표시
4. **장바구니** - 장바구니 관리 + 주문 요약
5. **결제** - 배송 정보 입력 (데모)
6. **주문 완료** - 기부 인증서 카드 + SNS 공유 버튼
7. **기부 현황** - 풀사이즈 3D 기부통 + 시즌 현황 + 기부처 소개
8. **브랜드 스토리** - 1구매=1기부 철학

### 🎨 디자인

- **컬러**: 모노크롬 (블랙 #000 / 화이트 #FFF / 그레이)
- **톤**: 미니멀, 클린, 캐주얼
- **반응형**: 768px 기준 (mo < 768 / pc ≥ 768)

### 🏆 3D 기부통 (Donation Globe)

- 투명 구체 안에 양말이 물리엔진으로 쌓임
- 오징어게임 돈통 레퍼런스
- 마우스/터치로 회전 가능
- 모바일 최적화 (양말 수 제한)

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```

개발 서버: http://localhost:3000

## 배포

### Vercel 배포 (권장)

1. Vercel 계정 로그인
```bash
vercel login
```

2. 프로젝트 배포
```bash
vercel --prod
```

또는 Vercel 대시보드에서 GitHub 레포 연결:
1. https://vercel.com/new 방문
2. `alphaca-labs/yangmar-demo` 레포 선택
3. Deploy 클릭

## 프로젝트 구조

```
app/
├── components/          # 글로벌 컴포넌트
│   ├── DonationCounter.tsx   # 상단 기부 카운터 바
│   ├── DonationGlobe.tsx     # 3D 기부통
│   ├── Header.tsx            # 헤더
│   ├── Footer.tsx            # 푸터
│   └── ProductCard.tsx       # 상품 카드
├── data/                # 목업 데이터
│   ├── products.ts           # 상품 데이터
│   └── donations.ts          # 기부 데이터 (시즌, 기부처)
├── store/               # 상태 관리 (Zustand)
│   ├── cart.ts               # 장바구니
│   └── donation.ts           # 기부 누적량
├── page.tsx             # 메인 페이지
├── products/            # 상품 페이지들
├── cart/                # 장바구니
├── checkout/            # 결제
├── order-complete/      # 주문 완료
├── donation/            # 기부 현황
├── story/               # 브랜드 스토리
├── layout.tsx           # 루트 레이아웃
└── globals.css          # 글로벌 스타일
```

## 데이터

현재는 **목업 데이터**로 동작합니다 (DB 없음).

- `app/data/products.ts` - 상품 정보
- `app/data/donations.ts` - 기부처, 시즌 정보
- `app/store/donation.ts` - 초기 기부량: 12,847켤레

실제 서비스에서는 백엔드 API 연동 필요.

## 미구현 사항

- ❌ 실제 결제 연동 (토스페이먼츠)
- ❌ 로그인/회원가입 (소셜 로그인)
- ❌ 마이페이지
- ❌ 주문 조회 (회원/비회원)
- ❌ 시즌 아카이브 상세
- ❌ 관리자 페이지

## 참고사항

### 3D 렌더링 성능

- 모바일: 양말 수 제한 (최대 100개)
- 초기 로딩 최적화: lazy loading (dynamic import)
- LOD 미적용 (필요시 추가)

### 이미지

- 로고: `public/images/yangmar-logo.png`
- 상품 이미지: 현재 이모지(🧦) 플레이스홀더
  - 실제 서비스 시 상품 사진으로 교체 필요

## 라이선스

이 프로젝트는 데모 목적입니다.

---

**제작**: 알파카랩스  
**날짜**: 2026-03-26
