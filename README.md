# Tripplai - 프론트엔드

AI 기반 여행 계획 플랫폼 Tripplai 의 프론트엔드 프로젝트입니다.

## 프로젝트 소개

Tripplai 는 사용자가 목적지와 일정만 입력하면 AI가 최적의 여행 코스를 추천해주는 서비스입니다. 개인 맞춤형 여행 계획을 쉽고 빠르게 만들 수 있습니다.

## 주요 기능

- **AI 여행 코스 추천**: 목적지, 일정, 선호도를 입력하면 AI가 최적의 여행 코스 제안
- **인기 여행지 탐색**: 지역별 인기 여행지 정보 제공
- **개인화된 대시보드**: 사용자별 여행 계획 관리
- **소셜 로그인**: 간편한 Google, Naver, Kakao 로그인 지원

## 기술 스택

- **프레임워크**: Next.js 15
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **상태 관리**: React Context API
- **인증**: NextAuth.js
- **배포**: Vercel

## 시작하기

### 필수 조건

- Node.js 18.x 이상
- npm 또는 yarn

### 설치 방법

1. 저장소 클론

```bash
git clone https://github.com/sideProjectTempName/client.git
cd client
```

2. 의존성 설치

```bash
npm install
# 또는
yarn install
```

3. 환경 변수 설정
   `.env.local` 파일을 루트 디렉토리에 생성하고 필요한 환경 변수 설정:

```
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

# OAuth 설정
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
NAVER_ID=your_naver_client_id
NAVER_SECRET=your_naver_client_secret
KAKAO_ID=your_kakao_client_id
KAKAO_SECRET=your_kakao_client_secret
```

4. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

이제 http://localhost:3000 에서 애플리케이션을 확인할 수 있습니다.

## 폴더 구조

```
frontend/
├── public/                 # 정적 파일 (이미지, 비디오 등)
├── src/
│   ├── app/                # Next.js App Router 페이지
│   │   ├── api/            # API 라우트
│   │   ├── dashboard/      # 대시보드 페이지
│   │   ├── login/          # 로그인 페이지
│   │   ├── travel/         # 여행 관련 페이지
│   │   └── ...
│   ├── components/         # 컴포넌트
│   │   ├── common/         # 공통 컴포넌트
│   │   ├── home/           # 홈페이지 컴포넌트
│   │   └── ...
│   ├── services/           # API 서비스
│   ├── styles/             # 전역 스타일
│   └── types/              # TypeScript 타입 정의
├── .env.local              # 환경 변수
└── ...
```

## 브랜치 관리

- `master`: 프로덕션 배포용 브랜치
- `develop`: 개발용 브랜치
- 기능 개발은 `feature/기능명` 브랜치에서 작업 후 `develop`으로 PR

## 스타일 가이드

- **컴포넌트**: React Functional Component와 Hooks 사용
- **네이밍**:
  - 컴포넌트: PascalCase (예: `NavSection.tsx`)
  - 그 외 파일: camelCase (예: `api.ts`)
- **스타일링**: Tailwind CSS 클래스 사용

## 기여하기

1. develop 브랜치에서 feature 브랜치 생성
2. 코드 작업
3. develop 브랜치로 Pull Request 생성
4. 코드 리뷰 후 머지

## 배포

Vercel을 통해 자동 배포됩니다.

- `master` 브랜치: 프로덕션 환경
- `develop` 브랜치: 개발 환경
