// Import required modules
import * as math from "mathjs";

// Helper: Compute GCD
function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Helper: Modular Exponentiation
function modExp(base: number, exponent: number, modulus: number): number {
  let result = 1;
  base = base % modulus;
  while (exponent > 0) {
    if (exponent % 2 === 1) result = (result * base) % modulus;
    exponent = Math.floor(exponent / 2);
    base = (base * base) % modulus;
  }
  return result;
}

// Mock Quantum Period Finder
function findPeriod(a: number, n: number): number {
  let r = 1;
  while (modExp(a, r, n) !== 1 && r < n) {
    r++;
  }
  return r;
}

// Main Shor's Algorithm Emulation
function shorsAlgorithm(n: number): number | null {
  if (n % 2 === 0) return 2;

  for (let a = 2; a < n; a++) {
    const gcdVal = gcd(a, n);
    if (gcdVal > 1) return gcdVal;

    const r = findPeriod(a, n);
    if (r % 2 !== 0) continue;

    const factor1 = gcd(modExp(a, r / 2) - 1, n);
    const factor2 = gcd(modExp(a, r / 2) + 1, n);

    if (factor1 > 1 && factor1 < n) return factor1;
    if (factor2 > 1 && factor2 < n) return factor2;
  }
  return null;
}

// Test
const pin = 5613;
console.log(`Breaking PIN: ${pin}`);
const factor = shorsAlgorithm(pin);

if (factor) {
  console.log(`Factor found: ${factor}`);
  console.log(`PIN ${pin} is breakable using Shor’s Algorithm!`);
} else {
  console.log("Could not find a factor with simulated quantum algorithm.");
}
