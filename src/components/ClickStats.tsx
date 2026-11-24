import { connection } from "next/server";
import { profile } from "@/data/profile";
import { getClickCounts } from "@/lib/clicks";

export default async function ClickStats() {
  // 매 요청마다 최신 클릭 수를 읽도록 요청 시점 렌더링으로 지정합니다.
  await connection();
  const counts = await getClickCounts();
  const total = profile.links.reduce((sum, l) => sum + (counts[l.id] ?? 0), 0);

  return (
    <div className="w-full">
      <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
        전체 클릭{" "}
        <strong className="text-lg text-zinc-900 dark:text-zinc-100">
          {total.toLocaleString("ko-KR")}
        </strong>
        회
      </p>
      <ul className="divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
        {profile.links.map((link) => {
          const count = counts[link.id] ?? 0;
          const ratio = total ? count / total : 0;
          return (
            <li key={link.id} className="px-5 py-4">
              <div className="flex items-baseline justify-between gap-4">
                <span className="truncate font-medium">{link.title}</span>
                <span className="shrink-0 tabular-nums font-semibold">
                  {count.toLocaleString("ko-KR")}
                </span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${ratio * 100}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
