/**
 * P0 migration helper — tải toàn bộ ảnh Unsplash mà `src-old` tham chiếu về
 * `public/images/unsplash/<photo-id>.jpg` (chọn biến thể width lớn nhất cho mỗi
 * photo-id). Chạy 1 lần: `node scripts/download-unsplash.mjs`
 */
import { mkdir, writeFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { execSync } from "node:child_process";

const OUT_DIR = join(process.cwd(), "public", "images", "unsplash");

const raw = execSync(
  `grep -rhoE "https://images\\.unsplash\\.com[^\\"'\\\`) ]*" src-old`,
  { encoding: "utf8" },
);

/** @type {Map<string, {url: string, width: number}>} */
const byId = new Map();
for (const url of new Set(raw.split("\n").filter(Boolean))) {
  const id = url.match(/photo-([a-z0-9]+)/)?.[1];
  if (!id) continue;
  const width = Number(url.match(/[?&]w=(\d+)/)?.[1] ?? "1200");
  const prev = byId.get(id);
  if (!prev || width > prev.width) byId.set(id, { url, width });
}

await mkdir(OUT_DIR, { recursive: true });
const manifest = {};
let ok = 0;
let skipped = 0;
for (const [id, { url }] of byId) {
  const file = `photo-${id}.jpg`;
  const dest = join(OUT_DIR, file);
  manifest[id] = `/images/unsplash/${file}`;

  const existing = await stat(dest).catch(() => null);
  if (existing && existing.size > 1024) {
    skipped++;
    continue;
  }

  const normalized =
    url.replace(/[?&]w=\d+/, "").replace(/([?&])q=\d+/, "$1q=85") +
    (url.includes("?") ? "&w=1600" : "?w=1600");

  try {
    const res = await fetch(normalized, {
      signal: AbortSignal.timeout(60000),
      headers: { "user-agent": "Mozilla/5.0 ipa-living-migration" },
    });
    if (!res.ok) {
      console.error(`FAIL ${id} ${res.status}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    ok++;
    console.log(`ok  ${file}  ${(buf.length / 1024).toFixed(0)}KB`);
  } catch (err) {
    console.error(`ERR ${id} ${err.message}`);
  }
}
console.log(`skipped (already present): ${skipped}`);

await writeFile(
  join(OUT_DIR, "manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(`\nDone: ${ok}/${byId.size} images -> ${OUT_DIR}`);
