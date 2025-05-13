# isin-lib-js

A JavaScript/TypeScript library for reversible conversion between International Securities Identification Numbers (ISINs) and uint256 (represented as BigInt) values using base36 encoding.

This library is essential for applications that need to bridge traditional financial identifiers (ISINs) with Ethereum Virtual Machine (EVM)-based smart contract identifiers (uint256), particularly in Node.js backend services or browser-based front-end applications.

## Why This Library Matters

Financial instruments are globally identified by ISINs, which are 12-character alphanumeric codes. However, smart contracts on EVM blockchains often use uint256 integers as unique identifiers (e.g., for NFTs). This creates a data type mismatch. isin-lib-js solves this by providing a standardized, reversible way to convert ISINs to uint256 values (and back) using base36 encoding. This ensures a reliable one-to-one mapping, crucial for integrating traditional financial assets with blockchain applications.

For a deeper dive into the challenge and our comprehensive solution, please read our article: [https://webmobix.com](https://webmobix.com)

## Features

- Converts ISIN strings to BigInt (representing uint256).
- Converts BigInt (representing uint256) back to ISIN strings.
- Uses base36 encoding for efficient and reversible conversion.
- Validates ISIN format (length and alphanumeric characters).
- Ensures correct padding for ISINs generated from BigInt.
- Written in TypeScript for type safety, usable in both JavaScript and TypeScript projects.

## Installation

```shell
npm install @webmobix/isin-lib-js
```

## Usage

### Importing

CommonJS (Node.js):

```javascript
const { isinToUint256, uint256ToIsin } = require("@webmobix/isin-lib-js");
```

ES Modules / TypeScript:

```javascript
import { isinToUint256, uint256ToIsin } from "@webmobix/isin-lib-js";
```

### Converting ISIN to BigInt (uint256)

```javascript
const isin = 'US0378331005'; // Example Apple Inc. ISIN
try {
 const uint256Value = isinToUint256(isin);
 console.log(`ISIN: ${isin}`);
 console.log(`uint256 (BigInt): ${uint256Value.toString()}`);
 // Example: For "US0378331005", this would output a specific BigInt value.
} catch (error) {
 console.error((error as Error).message);
}
```

### Converting BigInt (uint256) to ISIN

```javascript

// This BigInt value would typically come from a smart contract or a previous conversion.
// Replace with an actual BigInt value obtained from isinToUint256.
const exampleUint256Value = BigInt("33366803344263005"); // Placeholder for 'US0378331005'

try {
 const isin = uint256ToIsin(exampleUint256Value);
 console.log(`uint256 (BigInt): ${exampleUint256Value.toString()}`);
 console.log(`ISIN: ${isin}`);
 // This would output the ISIN corresponding to the exampleUint256Value,
 // correctly padded with leading zeros if necessary. e.g., 'US0378331005'
} catch (error) {
 console.error((error as Error).message);
}
```

## API

`isinToUint256(isin: string): BigInt`

- Takes a 12-character alphanumeric ISIN string.
- Returns its BigInt representation.
- Throws an error for invalid ISIN formats.

`uint256ToIsin(value: BigInt): string`

- Takes a BigInt value.
- Returns the corresponding 12-character ISIN string (padded with leading '0's if necessary).
- Throws an error if the value is too large to be represented as a 12-character base36 string or if it's negative.

## Sister Libraries

This library is part of a suite designed to provide consistent ISIN \<=\> uint256 conversion across different environments:

- isin-lib-java: For Java backend applications.
  ([https://github.com/webmobix/isin-lib-java](https://github.com/webmobix/isin-lib-java))
- isin-lib-solidity: For direct use in EVM smart contracts.
  ([https://github.com/webmobix/isin-lib-solidity](https://github.com/webmobix/isin-lib-solidity))

## Contributing

Contributions are welcome\! Please feel free to submit issues or pull requests.

## License

This project is licensed under the Apache License 2.0. See the LICENSE file for details.
