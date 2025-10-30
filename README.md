# 시소바이오 기업 홈페이지

청정 동해 해양심층수로 만든 프리미엄 소금 전문 기업 시소바이오의 공식 홈페이지입니다.

## 📋 프로젝트 개요

- **프로젝트명**: 시소바이오 반응형 기업 홈페이지
- **기술 스택**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **배포**: GitHub Pages + Cloudflare CDN
- **기간**: 2025.10.23 - 2025.10.28 (6일)
- **목표**: Lighthouse 성능 90+ 달성

## 🌟 주요 기능

- ✅ **반응형 디자인**: Mobile/Tablet/Desktop 완벽 지원
- ✅ **다크 모드**: Light/Dark 테마 전환
- ✅ **다국어 지원**: 한국어/English 전환
- ✅ **접근성**: WCAG AA 준수 (4.5:1 대비)
- ✅ **성능 최적화**: WebP 이미지, Lazy Loading
- ✅ **SEO 최적화**: Semantic HTML5, Meta Tags

## 📁 프로젝트 구조

```
sisobio-homepage/
├── index.html                 # 메인 HTML 파일
├── assets/
│   ├── css/                   # CSS 스타일시트
│   │   ├── reset.css          # CSS 리셋
│   │   ├── variables.css      # CSS 변수 (Light/Dark)
│   │   ├── layout.css         # 레이아웃
│   │   ├── components.css     # 컴포넌트
│   │   └── responsive.css     # 반응형
│   ├── js/                    # JavaScript 모듈
│   │   ├── main.js            # 메인 스크립트
│   │   ├── theme.js           # 테마 전환
│   │   ├── i18n.js            # 다국어
│   │   └── nav.js             # 네비게이션
│   ├── images/                # 이미지 에셋
│   │   ├── hero/              # Hero 배너 이미지
│   │   ├── products/          # 제품 이미지
│   │   ├── certifications/    # 인증서 이미지
│   │   └── icons/             # SVG 아이콘
│   └── locales/               # 다국어 JSON
│       ├── ko.json            # 한국어
│       └── en.json            # English
├── .gitignore                 # 제외 사항
└── README.md                  # 이 파일
```

## 🚀 로컬 개발 환경 설정

### 1. 프로젝트 클론

```bash
git clone https://github.com/yourusername/sisobio-homepage.git
cd sisobio-homepage
```

### 2. 로컬 서버 실행

**Python 3 사용 (권장):**
```bash
python3 -m http.server 8000
```

**Python 2 사용:**
```bash
python -m SimpleHTTPServer 8000
```

**Node.js 사용:**
```bash
npx http-server -p 8000
```

### 3. 브라우저에서 열기

```
http://localhost:8000
```

## 🎨 디자인 시스템

### 컬러 팔레트

**Light Mode:**
- Primary: `#0066CC` (Ocean Blue)
- Secondary: `#005B96` (Deep Sea Blue)
- Accent: `#09A9C8` (Light Ocean)

**Dark Mode:**
- Primary: `#4A9EFF` (Ocean Blue - Lighter)
- Background: `#0A1929` (Dark Navy)

### 타이포그래피

- **한글**: Noto Sans KR (400, 500, 700)
- **영문**: Roboto (400, 500, 700)
- **기본 크기**: 16px
- **스케일**: 8px Grid System

### 브레이크포인트

```css
Mobile:  < 768px
Tablet:  768px - 1023px
Desktop: ≥ 1024px
```

## 📦 주요 기술 스택

### Frontend
- HTML5 (Semantic Markup)
- CSS3 (CSS Variables, Grid, Flexbox)
- JavaScript (ES6+, Modules)

### 최적화
- WebP 이미지 포맷
- Lazy Loading
- CSS Custom Properties
- Font Display Swap

### 접근성
- WCAG AA 준수
- 키보드 네비게이션
- Screen Reader 지원
- ARIA Attributes

## 🔧 개발 가이드

### CSS 변수 사용

```css
/* ❌ 하드코딩하지 마세요 */
color: #0066CC;

/* ✅ CSS 변수 사용 */
color: var(--color-primary);
```

### 다국어 속성 추가

```html
<!-- data-i18n 속성 추가 -->
<h1 data-i18n="hero.title">청정 동해의 해양심층수</h1>
```

### 반응형 이미지

```html
<picture>
  <source media="(min-width: 1024px)" srcset="image-desktop.webp">
  <source media="(min-width: 768px)" srcset="image-tablet.webp">
  <img src="image-mobile.webp" alt="..." loading="lazy">
</picture>
```

## 📊 성능 목표

- **Lighthouse Performance**: ≥90
- **Lighthouse Accessibility**: ≥90
- **Lighthouse Best Practices**: ≥90
- **Lighthouse SEO**: ≥90

## 🌐 배포

### GitHub Pages

```bash
# main 브랜치에 푸시
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main

# Settings → Pages → Source: main/(root)
```

### Cloudflare CDN

GitHub Pages 배포 후 Cloudflare에서 CDN 설정

## 🐛 디버깅

### 로컬 서버 CORS 이슈

- `file://` 프로토콜은 `fetch()` 지원하지 않음
- 반드시 로컬 서버 사용 (`http://localhost:8000`)

### 다국어 파일 로드 실패

```javascript
// Console에서 확인
console.log(window.i18nManager.getCurrentLanguage());
```

### 테마 전환 안 됨

```javascript
// Console에서 테스트
document.documentElement.setAttribute('data-theme', 'dark');
```

## 📝 브라우저 지원

- Chrome/Edge: 최신 2개 버전
- Firefox: 최신 2개 버전
- Safari: 최신 2개 버전
- iOS Safari: iOS 14+
- Android Chrome: Android 8+

## 🔑 키보드 단축키

- `Ctrl/Cmd + Shift + T`: 테마 전환
- `Ctrl/Cmd + Shift + L`: 언어 전환
- `ESC`: 모바일 메뉴 닫기

## 📞 문의

- **회사명**: 시소바이오 (Siso Bio)
- **대표**: 천경도 (John Chun)
- **전화**: 070-8018-9079
- **홈페이지**: www.sisobio.com
- **주소**: 강원도 고성군 죽왕면 송지호로 42, 3층 10호

## 📄 라이선스

Copyright © 2025 Siso Bio. All rights reserved.

---

**제작**: 유비니즈 주식회사
