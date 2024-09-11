import { Register } from "./register";
import { binaryToFloat } from "../utils/binary-to-float";
import { roundTo05 } from "../utils/round-to-05";
import { Memory } from "./memory";
import { IComponentsState } from "../interfaces/components-state";

/* The ALU class in TypeScript defines arithmetic logic unit operations such as addition, subtraction,
division, multiplication, saving to memory, and resetting the accumulator. */
export class ALU {
    private ac: Register;

    constructor() {
        this.ac = new Register("00000000"); // Accumulator
    }
    
    /**
     * The function adds a binary value to the accumulator, rounds the result to the nearest 0.5,
     * handles overflow, and updates the step state.
     * @param {string} value - The `value` parameter in the `add` function represents the binary string
     * which is added to the current value stored in the accumulator.
     * @param {IComponentsState} step - The `step` parameter in the `add` function is an
     * object representing the state of components. It contains properties such as `display`,
     * `ac`, and `ac_on`. The function updates the `step` object with the result of the addition
     * operation and sets `ac_on`
     * @returns The `add` function returns a boolean value or the string "OVERFLOW".
     */
    add(value: string, step: IComponentsState): boolean | string {
        const aux = (roundTo05(binaryToFloat(this.ac.read()) + binaryToFloat(value))).toString(2);
        
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

    /**
     * The function subtracts a binary value from another binary value and handles underflow errors.
     * @param {string} value - Value is the string representing the value to be subtracted from the
     * current value stored in the system.
     * @param {IComponentsState} step - The `step` parameter is of type `IComponentsState`.
     *  The `step` is an object that contains information about the current state of
     * components. In the `subtract` function the `step` object is updated with
     * the result of the subtraction operation
     * @returns The `subtract` function returns either a boolean value `true` or a string value
     * `"UNDERFLOW"`.
     */
    subtract(value: string, step: IComponentsState): boolean | string {
        const aux = (roundTo05(binaryToFloat(this.ac.read()) - binaryToFloat(value))).toString(2);

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

   
    /**
     * This TypeScript function divides two binary numbers, handles errors for division by zero and
     * overflow, and updates the state accordingly.
     * @param {string} value - The `value` parameter in the `divide` function represents the value by
     * which the accumulator (`ac`) will be divided. The function performs division of the current
     * value in the accumulator by the provided `value`. If the `value` is "00000000", it will result
     * in a division by
     * @param {IComponentsState} step - The `step` parameter is an object representing the
     * state of components in a system. It's contains properties such as `display`, `ac`, and
     * `ac_on` which are being updated within the `divide` function based on the calculations
     * performed. The function is handling division operations and updating
     * @returns The `divide` function returns a boolean value or a string. If the value being divided
     * by is "00000000", it returns the string "DIVIDE_BY_ZERO" and sets the `step.display` to
     * "UNDEFINED". If the result of the division exceeds 8 characters, it returns the string
     * "OVERFLOW" and sets the `step.display` to "OVERFLOW". Otherwise,
     */
    divide(value: string, step: IComponentsState): boolean | string {
        if (value === "00000000") { 
            console.log("Error: DIVIDE BY ZERO");

            step.display = "UNDEFINED";

            return "DIVIDE_BY_ZERO";
        }

        const quotient = roundTo05(binaryToFloat(this.ac.read()) / binaryToFloat(value)); 
        const result = quotient.toString(2);

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

    
    /**
     * The function multiplies two binary floating-point numbers and handles overflow by returning a
     * boolean or string value.
     * @param {string} value - Value is a string representing a binary number.
     * @param {IComponentsState} step - The `step` parameter seems to be an object of type
     * `IComponentsState` which contains information about the current state of components. It is used
     * to update the state during the execution of the `multiply` function. The function performs a
     * multiplication operation and updates the `step` object with the result
     * @returns The function `multiply` will return either a boolean value `true` if the operation is
     * successful, or a string value `"OVERFLOW"` if an overflow error occurs.
     */
    multiply(value: string, step: IComponentsState): boolean | string {
        const aux = (roundTo05(binaryToFloat(this.ac.read()) * binaryToFloat(value))).toString(2);

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

    
    /**
     * The `save` function saves the value in the accumulator to a specified memory address and updates
     * the components state with the memory and display values.
     * @param {Memory} memory - The `memory` parameter is an object that represents the memory
     * of a computer system. It is used to store and retrieve data at specific memory addresses.
     * @param {string} address - The `address` parameter in the `save` function is a string that
     * represents the memory address where the data will be stored.
     * @param {IComponentsState} step - The `step` parameter is an object representing the state of
     * components in a system. It contains information about the current state of memory and
     * display components. The `save` function is for updating the memory
     * with a value read from the accumulator (`ac`) and then updating the
     */
    save(memory: Memory, address: string, step: IComponentsState): void {
        memory.storage(address, this.ac.read());

        step.memory = {...memory.memory};
        step.display = roundTo05(binaryToFloat(this.ac.read())).toString();
    }

    /**
     * Resets the accumulator to the value "00000000".
     */
    end(): void {
        this.ac.storage("00000000");
    }
}
