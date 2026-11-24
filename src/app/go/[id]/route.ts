import { findLink } from "@/data/profile";
import { recordClick } from "@/lib/clicks";

// 링크 카드는 /go/{id} 를 가리킵니다.
// 여기서 클릭 수를 1 올린 뒤 실제 URL로 이동시킵니다.
// profile.ts에 등록된 링크만 허용하므로 임의 주소로의 리다이렉트(open redirect)는 불가능합니다.
export async function GET(_req: Request, ctx: RouteContext<"/go/[id]">) {
  const { id } = await ctx.params;
  const link = findLink(id);

  if (!link) {
    return new Response("존재하지 않는 링크입니다.", { status: 404 });
  }

  try {
    await recordClick(link.id);
  } catch (err) {
    // 집계에 실패해도 방문자는 목적지로 보내 줍니다.
    console.error("[링크나무] 클릭 기록 실패:", err);
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: link.url,
      "Cache-Control": "no-store",
    },
  });
}
