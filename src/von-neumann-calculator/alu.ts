import { Register } from "./register";
import { binaryToFloat } from "../utils/binary-to-float";
import { roundTo05 } from "../utils/round-to-05";
import { Memory } from "./memory";
import { IComponentsState } from "../interfaces/components-state";

export class ALU {
    private ac: Register;

    constructor() {
        this.ac = new Register("00000000"); // Accumulator
    }

    add(value: string, step: IComponentsState): boolean | string {
        let aux = (roundTo05(binaryToFloat(this.ac.read()) + binaryToFloat(value))).toString(2);
        
        if (aux.length > 8) {
            console.log("Error: OVERFLOW");

            step.display = "OVERFLOW";

            return "OVERFLOW";
        } else {
            this.ac.storage("0".repeat(8 - aux.length) + aux);

            step.ac = this.ac.read();
            step.ac_on = true;

            return true;
        }
    }

    subtract(value: string, step: IComponentsState): boolean | string {
        let aux = (roundTo05(binaryToFloat(this.ac.read()) - binaryToFloat(value))).toString(2);

        if (parseInt(aux, 2) < 0) {
            console.log("Error: UNDERFLOW");

            step.display = "UNDERFLOW";

            return "UNDERFLOW";
        } else {
            this.ac.storage("0".repeat(8 - aux.length) + aux);
            
            step.ac = this.ac.read();
            step.ac_on = true;
            return true;
        }
    }

    divide(value: string, step: IComponentsState): boolean | string {
        if (value === "00000000") { 
            console.log("Error: DIVIDE BY ZERO");

            step.display = "UNDEFINED";

            return "DIVIDE_BY_ZERO";
        }

        let quotient = roundTo05(binaryToFloat(this.ac.read()) / binaryToFloat(value)); 
        let result = quotient.toString(2);

        if (result.length > 8) {
            console.log("Error: OVERFLOW");

            step.display = "OVERFLOW";

            return "OVERFLOW";
        } else {
            this.ac.storage("0".repeat(8 - result.length) + result);

            step.ac = this.ac.read();
            step.ac_on = true;

            return true;
        }
    }

    multiply(value: string, step: IComponentsState): boolean | string {
        let aux = (roundTo05(binaryToFloat(this.ac.read()) * binaryToFloat(value))).toString(2);

        if (aux.length > 8) {
            console.log("Error: OVERFLOW");

            step.display = "OVERFLOW";

            return "OVERFLOW";
        } else {
            this.ac.storage("0".repeat(8 - aux.length) + aux);

            step.ac = this.ac.read();
            step.ac_on = true;

            return true;
        }
    }

    save(memory: Memory, address: string, step: IComponentsState): void {
        memory.storage(address, this.ac.read());

        step.memory = {...memory.memory};
        step.display = roundTo05(binaryToFloat(this.ac.read())).toString();
    }

    end(): void {
        this.ac.storage("00000000");
    }
}
