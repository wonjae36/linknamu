// 링크나무에 표시할 프로필과 링크 목록입니다.
// 이 파일만 수정하면 페이지 내용이 바뀝니다.
// ⚠️ 아래 값은 보여 주기용 더미 데이터입니다. 실제 내용으로 교체하세요.

export type LinkItem = {
  /** 클릭 수 집계 키. 한 번 정한 뒤에는 바꾸지 마세요 (바꾸면 클릭 수가 새로 시작됩니다). */
  id: string;
  title: string;
  url: string;
  /** 카드 왼쪽 아이콘 자리에 보여 줄 이모지 (없으면 제목 첫 글자) */
  emoji?: string;
  /** 카드에 함께 보여 줄 짧은 설명 (선택) */
  description?: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 폴더 기준 경로 또는 외부 이미지 URL */
  avatar: string;
  links: LinkItem[];
};

export const profile: Profile = {
  name: "서원재",
  bio: "축구 유니폼 콜렉터 : 레플리카보단 어센틱을 좋아해요",
  avatar: "/profile.jpg",
  links: [
    {
      id: "github",
      title: "GitHub",
      url: "https://github.com/wonjae36",
      emoji: "🐙",
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      url: "https://www.linkedin.com/",
      emoji: "👨‍💼",
    },
    {
      id: "blog",
      title: "Blog",
      url: "https://blog.naver.com/doodlingz",
      emoji: "✍️",
    },
  ],
};

export function findLink(id: string): LinkItem | undefined {
  return profile.links.find((link) => link.id === id);
}
