/**
 * The function `convertExpression` in TypeScript takes a mathematical expression as input and converts
 * it into an array of numbers and operators.
 * @param {string} expression - The `convertExpression` function takes an arithmetic expression as
 * input and converts it into an array of strings where numbers and operators are separated. If the
 * expression starts with a negative number followed by two numbers, it swaps the order of the numbers
 * and changes the operators to ["+", "-"].
 * @returns The function `convertExpression` returns an array of strings that represent the numbers and
 * operators extracted from the input expression. The array includes the operators, "SAVE", "END", and
 * the numbers found in the expression.
 */
export function convertExpression(expression: string): string[] {
    let numbers = expression.match(/\d+(\.\d+)?/g);
    let operators = expression.match(/[\+\-\*\/]/g) || [];
    
    let result: string[] = [];

    if (operators[0] !== "-" || operators.length !== (numbers?.length || 0)) {
        operators = ["+", ...operators];
    }

    // if (expression.startsWith('-') && numbers && numbers.length == 2) {
    //     let firstNumber = numbers[0]; 
    //     let secondNumber = numbers[1]; 

    //     numbers = [secondNumber, firstNumber];
    //     operators = ["+", "-"];
    // }

    for (let i = 0; i < operators.length; i++) {
        result.push(operators[i]);
    }

    result.push("SAVE", "END");
    result.push(...(numbers || []));
    
    return result;
}