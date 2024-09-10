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