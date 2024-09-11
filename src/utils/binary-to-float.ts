/**
 * The function `binaryToFloat` converts a binary string representing a floating point number to its
 * decimal equivalent.
 * @param {string} binaryString - The `binaryString` parameter is a string representing a binary number
 * in the format "integerPart.fractionalPart". The function `binaryToFloat` converts this binary number
 * into a floating-point number and returns it.
 * @returns The function `binaryToFloat` takes a binary string as input, converts it to a
 * floating-point number, and returns the floating-point number.
 */

export function binaryToFloat(binaryString: string): number {
    let [integerPart, fractionalPart] = binaryString.split('.');

    let integerDecimal = parseInt(integerPart, 2);

    let fractionalDecimal = 0;
    if (fractionalPart) {
        for (let i = 0; i < fractionalPart.length; i++) {
            fractionalDecimal += parseInt(fractionalPart[i], 10) * Math.pow(2, -(i + 1));
        }
    }

    let floatResult = integerDecimal + fractionalDecimal;

    return parseFloat(floatResult.toString());
}
