import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  avatar: string;
};

// 와이어프레임: 큰 원형 프로필 사진 → 이름 → 한 줄 소개 (가운데 정렬)
export default function ProfileHeader({ name, bio, avatar }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 흰 테두리 + 아래로 떨어지는 은은한 그림자로 살짝 떠 있는 느낌 */}
      <div className="rounded-full bg-white/70 p-1.5 shadow-[0_18px_40px_-12px_rgb(60_100_140/0.35),0_2px_6px_rgb(60_100_140/0.12)] ring-1 ring-white/80 dark:bg-white/10 dark:shadow-[0_18px_40px_-12px_rgb(0_0_0/0.6)] dark:ring-white/10">
        <Image
          src={avatar}
          alt={`${name} 프로필 사진`}
          width={144}
          height={144}
          priority
          className="size-28 rounded-full object-cover object-[50%_25%] sm:size-32"
        />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{name}</h1>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-muted text-balance break-keep">
        {bio}
      </p>
    </header>
  );
}
