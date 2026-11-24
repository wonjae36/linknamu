import { profile } from "@/data/profile";
import ProfileHeader from "@/components/ProfileHeader";
import LinkList from "@/components/LinkList";

// 와이어프레임(wireframe.png) 레이아웃
// ┌──────────────┐
// │     (사진)    │  원형 프로필 사진
// │     이름      │
// │   한 줄 소개   │
// │ [ 링크 카드 ] │  GitHub
// │ [ 링크 카드 ] │  LinkedIn
// │ [ 링크 카드 ] │  Blog
// └──────────────┘
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center px-6 pt-16 pb-10 sm:px-8 sm:pt-24">
      <ProfileHeader
        name={profile.name}
        bio={profile.bio}
        avatar={profile.avatar}
      />

      <LinkList links={profile.links} />

      <footer className="mt-auto pt-16 text-xs tracking-wide text-muted/70">
        🌳 링크나무
      </footer>
    </main>
  );
}
