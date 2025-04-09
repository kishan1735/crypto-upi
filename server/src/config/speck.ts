const ROUNDS = 27;

function rotateRight(x: number, r: number) {
  return ((x >>> r) | (x << (32 - r))) >>> 0;
}

function rotateLeft(x: number, r: number) {
  return ((x << r) | (x >>> (32 - r))) >>> 0;
}

export function speckEncrypt(
  plaintext: [number, number],
  key: [number, number, number, number]
): [number, number] {
  let [x, y] = plaintext;
  let [k0, k1, k2, k3] = key;
  const roundKeys = [k0];

  for (let i = 0; i < ROUNDS - 1; i++) {
    const temp = rotateRight(k1, 8);
    k1 = (k0 + temp) ^ i;
    k0 = rotateLeft(k0, 3) ^ k1;
    roundKeys.push(k0);

    [k1, k2, k3] = [k2, k3, k1];
  }

  for (let i = 0; i < ROUNDS; i++) {
    x = rotateRight(x, 8);
    x = (x + y) >>> 0;
    x ^= roundKeys[i];
    y = rotateLeft(y, 3);
    y ^= x;
  }

  return [x, y];
}

export function speckDecrypt(
  ciphertext: [number, number],
  key: [number, number, number, number]
): [number, number] {
  let [x, y] = ciphertext;
  let [k0, k1, k2, k3] = key;
  const roundKeys = [k0];

  for (let i = 0; i < ROUNDS - 1; i++) {
    const temp = rotateRight(k1, 8);
    k1 = (k0 + temp) ^ i;
    k0 = rotateLeft(k0, 3) ^ k1;
    roundKeys.push(k0);

    [k1, k2, k3] = [k2, k3, k1];
  }

  for (let i = ROUNDS - 1; i >= 0; i--) {
    y ^= x;
    y = rotateRight(y, 3);
    x ^= roundKeys[i];
    x = (x - y) >>> 0;
    x = rotateLeft(x, 8);
  }

  return [x, y];
}

export function parseHexKey(hexKey: string): [number, number, number, number] {
  if (hexKey.length !== 32) {
    throw new Error("Key must be a 128-bit hex string (32 characters)");
  }

  const buffer = Buffer.from(hexKey, "hex");
  return [
    buffer.readUInt32BE(0),
    buffer.readUInt32BE(4),
    buffer.readUInt32BE(8),
    buffer.readUInt32BE(12),
  ];
}

export function blocksToHex([x, y]: [number, number]): string {
  const xHex = (x >>> 0).toString(16).padStart(8, "0");
  const yHex = (y >>> 0).toString(16).padStart(8, "0");
  return xHex + yHex;
}

export function hexToBlocks(hex: string): [number, number] {
  const x = parseInt(hex.substring(0, 8), 16);
  const y = parseInt(hex.substring(8, 16), 16);
  return [x, y];
}

export function reverseVidFull(vid: string, speckKey: string) {
  const key = parseHexKey(speckKey);

  const encrypted1 = hexToBlocks(vid.slice(0, 16));
  const encrypted2 = hexToBlocks(vid.slice(16, 32));

  const [x1, y1] = speckDecrypt(encrypted1, key);
  const [x2, y2] = speckDecrypt(encrypted2, key);

  const buffer = Buffer.alloc(16);
  buffer.writeUInt32BE(x1, 0);
  buffer.writeUInt32BE(y1, 4);
  buffer.writeUInt32BE(x2, 8);
  buffer.writeUInt32BE(y2, 12);

  const merchantID = buffer.subarray(0, 8).toString("hex");
  const timestamp = buffer.readBigUInt64BE(8).toString();

  return { merchantID, timestamp };
}
