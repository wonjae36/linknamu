import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
};

export default function LinkCard({ link }: Props) {
  // next/link 대신 일반 <a>를 씁니다. 프리페치가 일어나면 클릭 수가 잘못 올라가기 때문입니다.
  return (
    <a
      href={`/go/${encodeURIComponent(link.id)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 active:translate-y-0 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-500"
    >
      <span
        aria-hidden
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-base font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
      >
        {link.title.charAt(0).toUpperCase()}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-semibold">{link.title}</span>
        {link.description && (
          <span className="truncate text-sm text-zinc-500 dark:text-zinc-400">
            {link.description}
          </span>
        )}
      </span>
      <span
        aria-hidden
        className="text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-emerald-500"
      >
        →
      </span>
    </a>
  );
}
