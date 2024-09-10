import { Memory } from "./memory";
import { ALU } from "./alu";
import { ControlUnit } from "./control-unit";
import { roundTo05 } from "../utils/round-to-05";
import { IComponentsState } from "../interfaces/components-state";

export class VonNeumannCalculator {
    private memory: Memory;
    private alu: ALU;
    private controlUnit: ControlUnit;

    constructor() {
        this.memory = new Memory();
        this.alu = new ALU();
        this.controlUnit = new ControlUnit();
    }

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
            let address = "0".repeat(4 - (i).toString(2).length) + (i).toString(2);

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

    run(steps: IComponentsState[]): void {
        this.controlUnit.fetch(this.memory, steps);
        let instruction = this.controlUnit.decode(steps);

        while (this.controlUnit.execute(instruction, this.alu, this.memory, steps)) {
            this.controlUnit.fetch(this.memory, steps);
            instruction = this.controlUnit.decode(steps);
        }
    }
}
