# 🌳 링크나무

내 모든 링크를 한 페이지에 모아 두고 하나의 URL로 공유하는 서비스입니다.

## 시작하기

```bash
npm install
cp .env.example .env.local   # MONGODB_URI 입력 (없으면 메모리에 임시 집계)
npm run dev                  # http://localhost:3000
```

## 내 정보로 바꾸기

`src/data/profile.ts`에서 이름, 소개, 프로필 사진, 링크 목록을 수정하세요.
프로필 사진은 `public/`에 넣고 경로(예: `/me.jpg`)를 적으면 됩니다.

> 링크의 `id`는 클릭 수 집계 키입니다. 바꾸면 해당 링크의 클릭 수가 0부터 다시 시작됩니다.

## 페이지 구성

| 경로 | 설명 |
| --- | --- |
| `/` | 프로필 + 링크 카드 (공유용 페이지) |
| `/go/{id}` | 클릭 수를 1 올리고 실제 링크로 이동 |
| `/stats` | 링크별 클릭 수 (검색엔진 비노출, 링크로 연결되어 있지 않음) |

클릭 수는 MongoDB `clicks` 컬렉션에 `{ _id: 링크id, count, lastClickedAt }` 형태로 저장됩니다.

## Vercel 배포

1. GitHub에 푸시한 뒤 Vercel에서 프로젝트를 가져옵니다.
2. Environment Variables에 `MONGODB_URI`(필요하면 `MONGODB_DB`)를 등록합니다.
3. MongoDB Atlas > Network Access에서 Vercel 접속을 허용합니다 (`0.0.0.0/0` 또는 Vercel 연동).
