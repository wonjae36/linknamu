import { profile } from "@/data/profile";
import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";

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
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center px-4 py-14 sm:py-20">
      <ProfileHeader
        name={profile.name}
        bio={profile.bio}
        avatar={profile.avatar}
      />

      <ul className="mt-12 flex w-full flex-col gap-4">
        {profile.links.map((link) => (
          <li key={link.id}>
            <LinkCard link={link} />
          </li>
        ))}
      </ul>

      <footer className="mt-auto pt-12 text-xs text-zinc-400">
        🌳 링크나무
      </footer>
    </main>
  );
}
