import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  /** 이 링크의 현재 클릭 수 */
  count: number;
  /** 카드를 눌렀을 때 (화면의 클릭 수를 바로 올리는 용도) */
  onClick?: () => void;
};

export default function LinkCard({ link, count, onClick }: Props) {
  // next/link 대신 일반 <a>를 씁니다. 프리페치가 일어나면 클릭 수가 잘못 올라가기 때문입니다.
  return (
    <a
      href={`/go/${encodeURIComponent(link.id)}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      // 마우스 휠 클릭(새 탭 열기)도 /go 를 거쳐 집계되므로 화면 숫자도 함께 올립니다.
      onAuxClick={(e) => {
        if (e.button === 1) onClick?.();
      }}
      // 글래스모피즘: 반투명 흰 배경 + 배경 블러 + 얇은 밝은 테두리
      className="group flex w-full items-center gap-4 rounded-3xl border border-white/70 bg-white/45 px-5 py-4 shadow-[0_8px_24px_-12px_rgb(60_100_140/0.25)] backdrop-blur-xl backdrop-saturate-150 transition duration-300 ease-out hover:bg-white/65 hover:shadow-[0_12px_28px_-12px_rgb(60_100_140/0.32)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 active:scale-[0.99] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_8px_24px_-12px_rgb(0_0_0/0.6)] dark:hover:bg-white/10"
    >
      <span
        aria-hidden
        className={`flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/70 font-bold text-sky-700 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.8)] dark:bg-white/10 dark:text-sky-200 dark:shadow-none ${link.emoji ? "text-xl" : "text-base"}`}
      >
        {link.emoji ?? link.title.charAt(0).toUpperCase()}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[15px] font-semibold">{link.title}</span>
        {link.description && (
          <span className="truncate text-sm text-muted">
            {link.description}
          </span>
        )}
      </span>
      <span className="shrink-0 text-xs tabular-nums text-muted">
        <span className="sr-only">클릭 수 </span>
        {count.toLocaleString("ko-KR")}회
      </span>
      <span
        aria-hidden
        className="text-muted/60 transition duration-300 ease-out group-hover:translate-x-0.5 group-hover:text-muted"
      >
        →
      </span>
    </a>
  );
}
