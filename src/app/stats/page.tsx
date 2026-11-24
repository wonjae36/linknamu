import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ClickStats from "@/components/ClickStats";

export const metadata: Metadata = {
  title: "클릭 통계 · 링크나무",
  robots: { index: false, follow: false },
};

export default function StatsPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 py-12 sm:py-16">
      <h1 className="text-xl font-bold sm:text-2xl">링크별 클릭 수</h1>
      <div className="mt-6">
        <Suspense
          fallback={
            <p className="text-sm text-zinc-500">클릭 수를 불러오는 중…</p>
          }
        >
          <ClickStats />
        </Suspense>
      </div>
      <Link
        href="/"
        className="mt-8 text-sm text-emerald-600 hover:underline dark:text-emerald-400"
      >
        ← 링크 페이지로
      </Link>
    </main>
  );
}
