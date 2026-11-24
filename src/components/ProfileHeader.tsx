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
      <Image
        src={avatar}
        alt={`${name} 프로필 사진`}
        width={144}
        height={144}
        priority
        className="size-32 rounded-full object-cover ring-4 ring-white shadow-md sm:size-36 dark:ring-zinc-800"
      />
      <p className="mt-5 text-base font-semibold">{name}</p>
      <h1 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
        {bio}
      </h1>
    </header>
  );
}
