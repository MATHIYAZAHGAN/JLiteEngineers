const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = ((c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1));
  }
  crcTable[n] = c >>> 0;
}

function crc32(buf) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcData = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcData), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function createPng(width, height, drawFn) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8 bits per channel
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const raw = Buffer.alloc(height * (width * 4 + 1));
  let pos = 0;

  for (let y = 0; y < height; y++) {
    raw[pos++] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = drawFn(x, y, width, height);
      raw[pos++] = Math.min(255, Math.max(0, Math.round(r)));
      raw[pos++] = Math.min(255, Math.max(0, Math.round(g)));
      raw[pos++] = Math.min(255, Math.max(0, Math.round(b)));
      raw[pos++] = Math.min(255, Math.max(0, Math.round(a)));
    }
  }

  const idatData = zlib.deflateSync(raw, { level: 9 });
  const idat = makeChunk('IDAT', idatData);
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, makeChunk('IHDR', ihdr), idat, iend]);
}

// Distance helper functions
function distSq(x1, y1, x2, y2) {
  return (x1 - x2) ** 2 + (y1 - y2) ** 2;
}

function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.sqrt(distSq(px, py, x1, y1));
  let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  const projX = x1 + t * dx;
  const projY = y1 + t * dy;
  return Math.sqrt(distSq(px, py, projX, projY));
}

function isInsidePoly(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1];
    const xj = poly[j][0], yj = poly[j][1];
    const intersect = ((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Draw the executive JLite Engineers emblem
function drawJLiteEmblem(x, y, w, h) {
  const nx = x / w; // 0 to 1
  const ny = y / h; // 0 to 1

  // Center & radius
  const cx = 0.5, cy = 0.5;
  const r = Math.sqrt((nx - cx) ** 2 + (ny - cy) ** 2);

  // Background: Deep Navy Squircle / Circle with Gold Border
  // Radius of circle ~ 0.47
  if (r > 0.48) {
    return [0, 0, 0, 0]; // Transparent outside
  }

  // Smooth Anti-Aliasing on outer edge
  let alpha = 1;
  if (r > 0.46) {
    alpha = 1 - (r - 0.46) / 0.02;
  }

  // Border: Metallic Gold (from 0.42 to 0.46)
  if (r >= 0.42 && r <= 0.46) {
    // Gold gradient based on angle
    const angle = Math.atan2(ny - cy, nx - cx);
    const grad = Math.sin(angle * 2) * 0.3 + 0.7; // 0.4 to 1.0
    const goldR = 245 * grad + 10;
    const goldG = 180 * grad + 15;
    const goldB = 25 * grad + 5;
    return [goldR, goldG, goldB, 255 * alpha];
  }

  // Inside circle: Deep Corporate Navy Gradient (#081426 to #152f52)
  const bgGrad = (nx + ny) * 0.5;
  let bgR = 8 * (1 - bgGrad) + 16 * bgGrad;
  let bgG = 20 * (1 - bgGrad) + 40 * bgGrad;
  let bgB = 38 * (1 - bgGrad) + 75 * bgGrad;

  // Now draw vector monogram elements (scaled 0-1 coordinate space):
  // 1. 'J' Top Crossbar: from (0.24, 0.26) to (0.46, 0.26)
  const jBarDist = distToSegment(nx, ny, 0.24, 0.26, 0.46, 0.26);
  // 2. 'J' Column: from (0.36, 0.26) to (0.36, 0.58)
  const jStemDist = distToSegment(nx, ny, 0.36, 0.26, 0.36, 0.58);
  // 3. 'J' Curve: from (0.36, 0.58) to (0.32, 0.70) to (0.22, 0.68)
  const jCurve1 = distToSegment(nx, ny, 0.36, 0.58, 0.32, 0.70);
  const jCurve2 = distToSegment(nx, ny, 0.32, 0.70, 0.22, 0.66);
  const jDist = Math.min(jBarDist, jStemDist, jCurve1, jCurve2);

  // 4. 'L' Column: from (0.54, 0.26) to (0.54, 0.68)
  const lStemDist = distToSegment(nx, ny, 0.54, 0.26, 0.54, 0.68);
  // 5. 'L' Foot: from (0.54, 0.68) to (0.76, 0.68)
  const lFootDist = distToSegment(nx, ny, 0.54, 0.68, 0.76, 0.68);
  // 6. 'L' Bevel terminal: from (0.76, 0.68) to (0.80, 0.62)
  const lBevelDist = distToSegment(nx, ny, 0.76, 0.68, 0.80, 0.62);
  const lDist = Math.min(lStemDist, lFootDist, lBevelDist);

  const letterStroke = 0.042; // Thickness of strokes

  // 7. Central High-Voltage 33kV Lightning Bolt (Polygon)
  const boltPoly = [
    [0.48, 0.28],
    [0.39, 0.48],
    [0.51, 0.48],
    [0.42, 0.72],
    [0.62, 0.46],
    [0.50, 0.46],
    [0.56, 0.28]
  ];
  const inBolt = isInsidePoly(nx, ny, boltPoly);

  // 8. Accent Energy Spark Dot at (0.76, 0.28)
  const sparkDist = Math.sqrt((nx - 0.76) ** 2 + (ny - 0.28) ** 2);
  const inSpark = sparkDist <= 0.035;

  // Rendering hierarchy:
  // Bolt takes topmost electric white/brilliant yellow glow
  if (inBolt) {
    // Electric white core with gold edge
    const coreGrad = 1 - Math.abs(ny - 0.5) * 1.5;
    return [255, 245 + coreGrad * 10, 160 + coreGrad * 95, 255 * alpha];
  }

  // Lightning subtle electric aura
  for (let i = 0; i < boltPoly.length; i++) {
    const p1 = boltPoly[i];
    const p2 = boltPoly[(i + 1) % boltPoly.length];
    const d = distToSegment(nx, ny, p1[0], p1[1], p2[0], p2[1]);
    if (d < 0.03) {
      const glow = (1 - d / 0.03) * 0.7;
      bgR = bgR * (1 - glow) + 251 * glow;
      bgG = bgG * (1 - glow) + 191 * glow;
      bgB = bgB * (1 - glow) + 36 * glow;
    }
  }

  // Spark Dot
  if (inSpark) {
    const sAlpha = 1 - (sparkDist / 0.035);
    return [255, 240, 140, 255 * alpha];
  }

  // Letters 'J' and 'L'
  const letterDist = Math.min(jDist, lDist);
  if (letterDist <= letterStroke) {
    const edge = letterDist / letterStroke; // 0 at center, 1 at edge
    const shine = Math.max(0, 1 - edge);
    // Gold gradient with metallic reflection
    const lR = 255 * (0.8 + 0.2 * shine);
    const lG = 190 + 55 * shine;
    const lB = 20 + 120 * shine;
    return [lR, lG, lB, 255 * alpha];
  }

  return [bgR, bgG, bgB, 255 * alpha];
}

// Generate multi-size ICO file containing PNG streams
function createIco(pngBuffers) {
  // ICO header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(pngBuffers.length, 4); // number of images

  let offset = 6 + pngBuffers.length * 16;
  const entries = [];

  for (const { width, height, buffer } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(width >= 256 ? 0 : width, 0);
    entry.writeUInt8(height >= 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(buffer.length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset of image data
    entries.push(entry);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map(p => p.buffer)]);
}

// Main execution
const targetDir = path.resolve('src');
const assetsDir = path.resolve('src/assets');

console.log('Generating Google Search-compliant Favicons...');

// Required sizes for Google Search, Chrome, iOS, Android
const sizes = [
  { name: 'favicon-48x48.png', size: 48, dir: assetsDir },
  { name: 'favicon-96x96.png', size: 96, dir: assetsDir },
  { name: 'favicon-144x144.png', size: 144, dir: assetsDir },
  { name: 'apple-touch-icon.png', size: 180, dir: assetsDir },
  { name: 'favicon-192x192.png', size: 192, dir: assetsDir },
  { name: 'favicon-512x512.png', size: 512, dir: assetsDir },
];

const icoSizes = [16, 32, 48, 64, 128, 256];
const icoEntries = [];

for (const s of icoSizes) {
  const buf = createPng(s, s, drawJLiteEmblem);
  icoEntries.push({ width: s, height: s, buffer: buf });
}

// Save ICO to src/favicon.ico
const icoBuf = createIco(icoEntries);
fs.writeFileSync(path.join(targetDir, 'favicon.ico'), icoBuf);
console.log('Saved src/favicon.ico (multi-resolution 16, 32, 48, 64, 128, 256px)');

// Save PNG icons
for (const s of sizes) {
  const buf = createPng(s.size, s.size, drawJLiteEmblem);
  fs.writeFileSync(path.join(s.dir, s.name), buf);
  console.log(`Saved ${s.dir}/${s.name} (${s.size}x${s.size})`);
}

// Also save root copy of 48x48 and 192x192 for direct crawler access
fs.writeFileSync(path.join(targetDir, 'favicon.png'), createPng(48, 48, drawJLiteEmblem));
console.log('Saved src/favicon.png (48x48 for Googlebot crawler root)');

console.log('All Google Search Favicons successfully generated!');
