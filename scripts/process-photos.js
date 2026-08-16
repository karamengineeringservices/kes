/* eslint-disable no-console */
// One-time image processor:
// - Trims uniform whitespace borders from each source photo
// - For circular-cropped originals (CEO, Service 14/15), does a light center-square
//   crop to remove the visible red circle ring.
// - NEVER upscales beyond source native pixels (withoutEnlargement).
// - Writes each result as a JPG at the exact slot filename in /public.
//
// Run: `node scripts/process-photos.js`

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const IN = path.join(__dirname, "..", "public", "Combined");
const OUT = path.join(__dirname, "..", "public");

async function trimAndSave(inFile, outFile, opts = {}) {
  const inPath = path.join(IN, inFile);
  const outPath = path.join(OUT, outFile);
  const { threshold = 30, quality = 92, maxWidth } = opts;

  let pipeline = sharp(inPath).trim({ background: "white", threshold });
  if (maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  await pipeline.jpeg({ quality, progressive: true, mozjpeg: true, chromaSubsampling: "4:4:4" }).toFile(outPath);
  const meta = await sharp(outPath).metadata();
  console.log(`  ${inFile.padEnd(20)} → ${outFile.padEnd(24)} ${meta.width}×${meta.height}`);
}

async function circleCropAndSave(inFile, outFile, opts = {}) {
  const inPath = path.join(IN, inFile);
  const outPath = path.join(OUT, outFile);
  const { ratio = 0.95, threshold = 30, quality = 92, maxWidth } = opts;

  const trimmed = await sharp(inPath).trim({ background: "white", threshold }).toBuffer();
  const m = await sharp(trimmed).metadata();
  const side = Math.floor(Math.min(m.width, m.height) * ratio);
  const left = Math.floor((m.width - side) / 2);
  const top = Math.floor((m.height - side) / 2);

  let pipeline = sharp(trimmed).extract({ left, top, width: side, height: side });
  if (maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }
  await pipeline.jpeg({ quality, progressive: true, mozjpeg: true, chromaSubsampling: "4:4:4" }).toFile(outPath);
  const outMeta = await sharp(outPath).metadata();
  console.log(
    `  ${inFile.padEnd(20)} → ${outFile.padEnd(24)} ${outMeta.width}×${outMeta.height}  (circle-crop ${(ratio * 100).toFixed(0)}%)`
  );
}

async function main() {
  if (!fs.existsSync(IN)) {
    console.error(`Source folder not found: ${IN}`);
    process.exit(1);
  }

  console.log("\nProcessing photos (no upscaling, quality 92):\n");

  // Service slots — display in ~400×300 cards, source ~225×200. Keep native.
  await trimAndSave("Service 3.jpg", "service-01.jpg");
  await trimAndSave("Service 5.jpg", "service-02.jpg");
  await trimAndSave("Service 7.jpg", "service-03.jpg");
  await trimAndSave("Service 13.jpg", "service-04.jpg");
  await trimAndSave("Service 4.jpg", "service-05.jpg");
  await trimAndSave("Service 12.jpg", "service-06.jpg");

  // Project slots
  await trimAndSave("Service 11.jpg", "project-featured.jpg");
  await trimAndSave("Service 10.jpg", "project-1.jpg");
  await trimAndSave("Service 1.jpg", "project-2.jpg");
  await trimAndSave("Service 2.jpg", "project-3.jpg");
  await trimAndSave("Service 9.jpg", "project-4.jpg");
  await trimAndSave("Service 6.jpg", "project-5.jpg");

  // Circle-cropped originals — near-full circle content to keep full face/subject
  await circleCropAndSave("CEO.jpg", "ceo.jpg", { ratio: 0.95 });
  await circleCropAndSave("Service 15.jpg", "project-6.jpg", { ratio: 0.9 });

  // Logo — keep small, don't enlarge
  await trimAndSave("KARAM Logo.jpg", "logo.jpg", { quality: 95 });

  // Ship rendering (kept but not currently used)
  await trimAndSave("Ship.jpg", "ship.jpg", { quality: 92 });

  // Remove any stale hero.jpg — we're reverting to SVG-only hero because
  // source photos aren't large enough for full-bleed display without blur.
  const staleHero = path.join(OUT, "hero.jpg");
  if (fs.existsSync(staleHero)) {
    fs.unlinkSync(staleHero);
    console.log("  (removed) hero.jpg — reverted to SVG hero (source photos too small for full-bleed)");
  }

  console.log("\nDone.\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
