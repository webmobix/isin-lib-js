export class ISINConverter {
  // Encode ISIN to uint256
  static isinToUint256(isin: string): bigint {
    // Normalize input: convert to uppercase
    isin = isin.toUpperCase();

    // Validate that the normalized ISIN contains only valid characters
    if (!/^[A-Z0-9]{12}$/.test(isin)) {
      throw new Error("Invalid character in ISIN");
    }

    let numericValue = BigInt(0);
    for (const ch of isin) {
      let value: number;
      if (/[0-9]/.test(ch)) {
        value = parseInt(ch); // 0-9 => 0-9
      } else if (/[A-Z]/.test(ch)) {
        value = ch.charCodeAt(0) - 55; // A-Z => 10-35
      } else {
        throw new Error("Invalid character in ISIN");
      }
      numericValue = numericValue * BigInt(36) + BigInt(value);
    }
    return numericValue;
  }

  // Decode uint256 back to ISIN
  static uint256ToIsin(value: bigint): string {
    const MAX_ISIN_VALUE = BigInt(36) ** BigInt(12) - BigInt(1);

    // Ensure the value is within the valid ISIN range
    if (value > MAX_ISIN_VALUE) {
        throw new Error("Invalid uint256 to decode as ISIN");
    }

    const base = BigInt(36);
    let isin = "";

    while (value > 0) {
      const remainder = Number(value % base);
      const ch =
        remainder < 10
          ? String.fromCharCode(48 + remainder) // 0-9
          : String.fromCharCode(55 + remainder); // A-Z
      isin = ch + isin;
      value = value / base;
    }

    // Pad with leading zeros to ensure 12 characters
    while (isin.length < 12) {
      isin = "0" + isin;
    }

    return isin;
  }
}
