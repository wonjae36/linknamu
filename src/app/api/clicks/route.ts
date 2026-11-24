import { connection } from "next/server";
import { profile } from "@/data/profile";
import { getClickCounts } from "@/lib/clicks";

// GET /api/clicks → { counts: { github: 42, linkedin: 7, blog: 0 } }
// 메인 화면이 열릴 때 모든 링크의 클릭 수를 한 번에 가져가는 용도입니다.
export async function GET() {
  // 빌드 시 미리 만들어 두지 않고, 요청이 올 때마다 최신 값을 읽습니다.
  await connection();

  try {
    const all = await getClickCounts();
    // profile.ts에 등록된 링크만, 기록이 없으면 0으로 채워서 돌려줍니다.
    const counts = Object.fromEntries(
      profile.links.map((link) => [link.id, all[link.id] ?? 0]),
    );
    return Response.json(
      { counts },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    console.error("[링크나무] 클릭 수 조회 실패:", err);
    return Response.json(
      { error: "클릭 수를 불러오지 못했습니다." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
