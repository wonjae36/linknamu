"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "@/components/LinkCard";

type Props = {
  links: LinkItem[];
};

type Counts = Record<string, number>;

// 링크 카드 목록 + 클릭 수 표시
// - 처음에는 모든 카드가 0회로 보이고,
// - 페이지가 열리면 /api/clicks 로 모든 클릭 수를 한 번에 받아 실제 값으로 바꿉니다.
// - 카드를 누르면 실제 집계는 /go/{id} 에서 하고, 화면의 숫자도 바로 1 올립니다.
export default function LinkList({ links }: Props) {
  const [counts, setCounts] = useState<Counts>({});

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/clicks", { cache: "no-store", signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<{ counts: Counts }>;
      })
      .then((data) => {
        // 응답을 기다리는 사이에 카드를 눌렀다면 그만큼 더해서 숫자가 줄어들지 않게 합니다.
        setCounts((local) => {
          const merged: Counts = { ...data.counts };
          for (const [id, n] of Object.entries(local)) {
            merged[id] = Math.max(merged[id] ?? 0, n);
          }
          return merged;
        });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        // 불러오지 못하면 0회 그대로 둡니다. 링크 이동에는 영향이 없습니다.
        console.error("[링크나무] 클릭 수를 불러오지 못했습니다:", err);
      });

    return () => controller.abort();
  }, []);

  function handleClick(id: string) {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }

  return (
    <ul className="mt-12 flex w-full flex-col gap-3.5 sm:gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            link={link}
            count={counts[link.id] ?? 0}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
