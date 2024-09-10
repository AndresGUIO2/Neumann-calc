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
