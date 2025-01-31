import { describe, it, expect } from 'vitest';
import { ISINConverter } from '../src/index';

describe('ISINConverter', () => {
    describe('isinToUint256', () => {
        it('should encode a valid ISIN with only letters', () => {
            const isin = 'ABCDEFGHIJKL';
            const encoded = ISINConverter.isinToUint256(isin);
            const decoded = ISINConverter.uint256ToIsin(encoded);
            expect(decoded).toBe(isin);
        });

        it('should encode a valid ISIN with only numbers', () => {
            const isin = '012345678901';
            const encoded = ISINConverter.isinToUint256(isin);
            const decoded = ISINConverter.uint256ToIsin(encoded);
            expect(decoded).toBe(isin);
        });

        it('should encode a valid ISIN with mixed letters and numbers', () => {
            const isin = 'US0378331005';
            const encoded = ISINConverter.isinToUint256(isin);
            const decoded = ISINConverter.uint256ToIsin(encoded);
            expect(decoded).toBe(isin);
        });

        it('should throw an error for ISINs with invalid characters', () => {
            const invalidIsin = 'US037833100$';
            expect(() => ISINConverter.isinToUint256(invalidIsin)).toThrow('Invalid character in ISIN');
        });

        it("should handle lowercase ISIN by converting to uppercase", () => {
            const lowercaseIsin = "us0378331005";
            const encoded = ISINConverter.isinToUint256(lowercaseIsin);
            const decoded = ISINConverter.uint256ToIsin(encoded);
            expect(decoded).toBe("US0378331005"); // Ensure it's handled as uppercase
        });
    });

    describe('uint256ToIsin', () => {
        it('should decode a zero value to "000000000000"', () => {
            const decoded = ISINConverter.uint256ToIsin(BigInt(0));
            expect(decoded).toBe('000000000000');
        });

        it("should handle small numeric values and pad with leading zeros", () => {
            const smallValue = BigInt(123); // Base-36 value
            const decoded = ISINConverter.uint256ToIsin(smallValue);
            expect(decoded).toBe("00000000003F"); // Correct base-36 result
        });

        it('should throw an error for invalid uint256 values', () => {
            const tooLarge = BigInt('4722366482869645213695'); // Larger than 36^12
            expect(() => ISINConverter.uint256ToIsin(tooLarge)).toThrow();
        });
    });

    describe('Round-Trip Tests', () => {
        it('should maintain data integrity through encode-decode cycle', () => {
            const testCases = [
                'US0378331005',
                'DE000BAY0017',
                'GB0002374006',
                'FR0000131104',
                'CH0012221716',
            ];

            for (const testCase of testCases) {
                const encoded = ISINConverter.isinToUint256(testCase);
                const decoded = ISINConverter.uint256ToIsin(encoded);
                expect(decoded).toBe(testCase);
            }
        });

        it('should handle edge cases correctly', () => {
            const edgeCases = [
                '000000000000',
                '999999999999',
                'AAAAAAAAAAAA',
                'ZZZZZZZZZZZZ',
            ];

            for (const edgeCase of edgeCases) {
                const encoded = ISINConverter.isinToUint256(edgeCase);
                const decoded = ISINConverter.uint256ToIsin(encoded);
                expect(decoded).toBe(edgeCase);
            }
        });
    });
});
