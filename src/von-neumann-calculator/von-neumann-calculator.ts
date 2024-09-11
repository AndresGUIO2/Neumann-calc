import { Memory } from "./memory";
import { ALU } from "./alu";
import { ControlUnit } from "./control-unit";
import { roundTo05 } from "../utils/round-to-05";
import { IComponentsState } from "../interfaces/components-state";

/* The `VonNeumannCalculator` class in TypeScript represents a calculator that loads programs,
processes expressions, and executes instructions using components like Memory, ALU, and ControlUnit. */
export class VonNeumannCalculator {
    private memory: Memory;
    private alu: ALU;
    private controlUnit: ControlUnit;

    /**
     * The constructor initializes instances of Memory, ALU, and ControlUnit classes.
     */
    constructor() {
        this.memory = new Memory();
        this.alu = new ALU();
        this.controlUnit = new ControlUnit();
    }

    /**
     * The function `loadProgram` processes an array of expressions, converting them to binary and
     * storing them in memory.
     * @param {string[]} expression - An array of strings representing an arithmetic expression or
     * program instructions.
     * @param {IComponentsState[]} steps - steps is an array of IComponentsState objects that represent
     * the state of components in a program execution. The function loadProgram takes an array of
     * string expressions and updates the steps array based on the processing of these expressions. It
     * checks each expression element for validity and converts them into binary format or performs
     * specific actions
     * @returns The `loadProgram` function returns a boolean value - `true` if the program loading was
     * successful, and `false` if there was an issue with the input or during the loading process.
     */
    loadProgram(expression: string[], steps: IComponentsState[]): boolean {
        for (let i = 0; i < expression.length; i++) {
            if (isNaN(parseInt(expression[i])) && !["+","-","/","*",".","SAVE","END"].includes(expression[i])) {
                steps[0].display = "INVALID INPUT";
                return false;
            }

            switch (expression[i]) {
                case "+":
                    expression[i] = "0000";
                    break;
                case "-":
                    expression[i] = "0001";
                    break;
                case "/":
                    expression[i] = "0010";
                    break;
                case "*":
                    expression[i] = "0011";
                    break;
                case "SAVE":
                    expression[i] = "0100";
                    break;
                case "END":
                    expression[i] = "0101";
                    break;
                default:
                    if (parseInt(expression[i]) < 0) {
                        steps[0].display = "NEGATIVE NUMBERS ARE NOT ALLOWED";
                        return false;
                    }

                    if (expression[i].includes('.')) {
                        expression[i] = roundTo05(parseFloat(expression[i])).toString(2);
                    } else {
                        expression[i] = parseInt(expression[i]).toString(2);
                    }
    
                    if (expression[i].length > 8) {
                        steps[0].display = "OVERFLOW";
                        return false;
                    }
    
                    if (expression[i].length < 8) {
                        expression[i] = "0".repeat(8 - expression[i].length) + expression[i];
                    }
            }
        }

        let aux = "0000";

        for (let i = 0; i < expression.length; i++) {
            if (expression[i].length <= 4) {
                aux = (parseInt(aux, 2) + 1).toString(2);
                aux = "0".repeat(4 - aux.length) + aux;
            }
            
            this.memory.storage("0".repeat(4 - (i).toString(2).length) + (i).toString(2), expression[i]);
        }
        
        let aux2 = aux;

        for (let i = 0; i < expression.length; i++) {
            const address = "0".repeat(4 - (i).toString(2).length) + (i).toString(2);

            if (address == aux) {
                break;
            }

            this.memory.storage(address, this.memory.read(address) + aux2);

            aux2 = (parseInt(aux2, 2) + 1).toString(2);
            aux2 = "0".repeat(4 - aux2.length) + aux2;
        }

        steps[0].memory = {...this.memory.memory};

        return true;
    }

    /**
     * The `run` function executes a series of steps by fetching, decoding, and executing instructions
     * until completion.
     * @param {IComponentsState[]} steps - The `steps` parameter in the `run` method is an
     * array of `IComponentsState` objects. These objects represent the current state of various
     * components in the system, such as the memory, ALU (Arithmetic Logic Unit), and control unit.
     */
    run(steps: IComponentsState[]): void {
        this.controlUnit.fetch(this.memory, steps);
        let instruction = this.controlUnit.decode(steps);

        while (this.controlUnit.execute(instruction, this.alu, this.memory, steps)) {
            this.controlUnit.fetch(this.memory, steps);
            instruction = this.controlUnit.decode(steps);
        }
    }
}
