// Pure Node.js script using built-in zlib to create crisp 192x192 and 512x512 PNG icons
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPng(width, height) {
  // 1. PNG Signature
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // CRC32 helper
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    crcTable[n] = c;
  }
  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const typeAndData = Buffer.concat([typeBuf, data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(typeAndData), 0);
    return Buffer.concat([len, typeAndData, crc]);
  }

  // 2. IHDR Chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8 bits per channel
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  const ihdrChunk = makeChunk('IHDR', ihdr);

  // 3. Image data: scanlines with filter 0
  const scanlineLength = width * 4 + 1;
  const rawData = Buffer.alloc(scanlineLength * height);

  const cx = width / 2;
  const cy = height / 2;
  const radius = width * 0.44;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineLength;
    rawData[rowOffset] = 0; // filter byte = 0
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Background rounded circle
      if (dist <= radius) {
        // Bolt shape check
        const inBolt = (
          (x > cx - width * 0.15 && x < cx + width * 0.15 && Math.abs(dx + dy * 0.4) < width * 0.18)
        );

        if (inBolt) {
          // Pure white / bright yellow bolt
          rawData[pxOffset] = 255;
          rawData[pxOffset + 1] = 255;
          rawData[pxOffset + 2] = 255;
          rawData[pxOffset + 3] = 255;
        } else {
          // Vibrant emerald sports green gradient (#10b981 to #059669)
          const factor = (y / height);
          rawData[pxOffset] = Math.round(16 + factor * 5);
          rawData[pxOffset + 1] = Math.round(185 - factor * 35);
          rawData[pxOffset + 2] = Math.round(129 - factor * 25);
          rawData[pxOffset + 3] = 255;
        }
      } else {
        // Deep obsidian background (#090d16)
        rawData[pxOffset] = 9;
        rawData[pxOffset + 1] = 13;
        rawData[pxOffset + 2] = 22;
        rawData[pxOffset + 3] = 255;
      }
    }
  }

  // Compress with zlib
  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const dir = path.resolve('public');
fs.writeFileSync(path.join(dir, 'icon-192.png'), createPng(192, 192));
fs.writeFileSync(path.join(dir, 'icon-512.png'), createPng(512, 512));
console.log('Generated icon-192.png and icon-512.png successfully!');
