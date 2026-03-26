# 양마르 데모 배포 가이드

## Vercel 배포 (브라우저)

1. **Vercel 방문**: https://vercel.com/new
2. **GitHub 연동**: alphaca-labs 계정으로 로그인
3. **레포 선택**: `alphaca-labs/yangmar-demo` 선택
4. **설정 확인**:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. **Deploy** 클릭
6. 배포 완료 후 URL 확인

배포 URL은 다음과 같은 형식입니다:
- Production: `https://yangmar-demo.vercel.app`
- Preview: `https://yangmar-demo-{hash}.vercel.app`

## Vercel CLI 배포 (터미널)

```bash
# 1. Vercel CLI 로그인
vercel login
# 브라우저에서 인증 완료

# 2. 프로젝트 배포
cd /Users/alphaca/.openclaw/workspace/projects/yangmar/app
vercel --prod

# 배포 URL 출력됨
```

## 배포 후 확인사항

- [ ] 메인 페이지 로딩
- [ ] 3D 기부통 렌더링 (시간 걸릴 수 있음)
- [ ] 상품 페이지 이동
- [ ] 장바구니 추가
- [ ] 결제 프로세스
- [ ] 모바일 반응형

## 트러블슈팅

### 3D 기부통이 안 보이는 경우
- 브라우저 WebGL 지원 확인
- Three.js 의존성 설치 확인
- 콘솔 에러 확인

### 빌드 실패
```bash
# 로컬에서 빌드 테스트
npm run build

# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

### 배포 URL이 안 열리는 경우
- Vercel 대시보드에서 배포 로그 확인
- DNS 전파 대기 (최대 5분)

---

**배포일**: 2026-03-26  
**레포**: https://github.com/alphaca-labs/yangmar-demo
