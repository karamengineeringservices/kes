const sharp = require("sharp");
const path = require("path");

const SRC = path.join(__dirname, "..", "public", "logo-mark.bak.png");
const OUT = process.env.OUT_FILE || path.join(__dirname, "..", "public", "logo-mark.png");

const BG = [253, 254, 254];
const HARD_TOL = Number(process.env.HARD_TOL || 15); // fully background within this distance
const SOFT_TOL = Number(process.env.SOFT_TOL || 55); // linear falloff to this distance

function dist(r, g, b) {
  const dr = r - BG[0], dg = g - BG[1], db = b - BG[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

async function run() {
  const { data, info } = await sharp(SRC)
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const isBg = new Uint8Array(width * height);

  // Flood fill from the border across near-white, connected pixels only,
  // so interior chrome highlights (which can also be near-white) stay opaque.
  const stack = [];
  for (let x = 0; x < width; x++) {
    stack.push([x, 0], [x, height - 1]);
  }
  for (let y = 0; y < height; y++) {
    stack.push([0, y], [width - 1, y]);
  }

  const visited = new Uint8Array(width * height);
  while (stack.length) {
    const [x, y] = stack.pop();
    if (x < 0 || y < 0 || x >= width || y >= height) continue;
    const idx = y * width + x;
    if (visited[idx]) continue;
    visited[idx] = 1;
    const i = idx * channels;
    const d = dist(data[i], data[i + 1], data[i + 2]);
    if (d > SOFT_TOL) continue; // not background-ish, stop expanding here
    isBg[idx] = 1;
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }

  for (let idx = 0; idx < width * height; idx++) {
    if (!isBg[idx]) continue;
    const i = idx * channels;
    const d = dist(data[i], data[i + 1], data[i + 2]);
    let alpha;
    if (d <= HARD_TOL) alpha = 0;
    else alpha = Math.round(255 * ((d - HARD_TOL) / (SOFT_TOL - HARD_TOL)));
    data[i + 3] = Math.min(data[i + 3], alpha);
  }

  // Feather the cut edge slightly so it doesn't look jagged, by blurring
  // just the alpha channel a touch.
  const FEATHER = Number(process.env.FEATHER || 0);
  if (FEATHER > 0) {
    const blurredAlpha = await sharp(data, { raw: { width, height, channels } })
      .extractChannel(3)
      .blur(FEATHER)
      .raw()
      .toBuffer();
    for (let idx = 0; idx < width * height; idx++) {
      data[idx * channels + 3] = blurredAlpha[idx];
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile(OUT + ".tmp");

  const fs = require("fs");
  fs.renameSync(OUT + ".tmp", OUT);
  console.log("done", width, height);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
