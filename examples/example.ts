import { ISINConverter } from "../src";

// Example usage
const isin = "US0378331005";
const encoded = ISINConverter.isinToUint256(isin);
console.log("Encoded:", encoded.toString());
const decoded = ISINConverter.uint256ToIsin(encoded);
console.log("Decoded:", decoded);
