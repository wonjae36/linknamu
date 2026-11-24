import "server-only";
import { getDb } from "./mongodb";

type ClickDoc = {
  _id: string;
  count: number;
  lastClickedAt: Date;
};

// MONGODB_URI가 없을 때(로컬에서 처음 실행할 때 등)는 메모리에 임시로 집계합니다.
// 서버를 재시작하면 사라지므로 실제 서비스에서는 반드시 MongoDB를 연결하세요.
// 라우트 핸들러와 페이지가 서로 다른 번들로 로드되므로 전역 객체에 둬서 공유합니다.
const globalForClicks = globalThis as unknown as {
  _linknamuMemoryCounts?: Map<string, number>;
  _linknamuWarned?: boolean;
};
const memoryCounts = (globalForClicks._linknamuMemoryCounts ??= new Map());

function warnNoDb() {
  if (!globalForClicks._linknamuWarned) {
    console.warn(
      "[링크나무] MONGODB_URI가 설정되지 않아 클릭 수를 메모리에만 저장합니다.",
    );
    globalForClicks._linknamuWarned = true;
  }
}

async function collection() {
  const db = await getDb();
  return db ? db.collection<ClickDoc>("clicks") : null;
}

export async function recordClick(linkId: string): Promise<void> {
  const col = await collection();
  if (!col) {
    warnNoDb();
    memoryCounts.set(linkId, (memoryCounts.get(linkId) ?? 0) + 1);
    return;
  }
  await col.updateOne(
    { _id: linkId },
    { $inc: { count: 1 }, $set: { lastClickedAt: new Date() } },
    { upsert: true },
  );
}

export async function getClickCounts(): Promise<Record<string, number>> {
  const col = await collection();
  if (!col) {
    warnNoDb();
    return Object.fromEntries(memoryCounts);
  }
  const docs = await col.find().toArray();
  return Object.fromEntries(docs.map((d) => [d._id, d.count]));
}
