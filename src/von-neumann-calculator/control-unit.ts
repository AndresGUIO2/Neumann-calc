import { Register } from "./register";
import { ALU } from "./alu";
import { Memory } from "./memory";
import { IComponentsState } from "../interfaces/components-state";

/* The `ControlUnit` class in TypeScript represents a control unit for a computer system that performs
fetch, decode, execute operations with memory and ALU interactions. */
export class ControlUnit {
    private ir: Register;
    private pc: Register;
    private mar: Register;
    private ibr: Register;

    constructor() {
        this.ir = new Register(); // Instruction Register
        this.pc = new Register(); // Program Counter
        this.mar = new Register(); // Memory Address Register
        this.ibr = new Register(); // Instruction Buffer Register
    }

   /**
    * The fetch function performs a multi-step cycle to retrieve instructions from memory and update
    * the program counter.
    * @param {Memory} memory - The `memory` parameter in the `fetch` function represents the memory
    * component of a computer system. It is used to read data from memory locations during the fetch
    * cycle of the instruction execution process. The `fetch` function takes a series of steps as input
    * and updates the state of various components based on
    * @param {IComponentsState[]} steps - The `steps` parameter in the `fetch` function is an array of
    * `IComponentsState` objects representing the state of various components in a system. Each step in
    * the fetch cycle involves updating and modifying these component states to perform the necessary
    * operations. The function progresses through the fetch cycle by updating the
    */
    fetch(memory: Memory, steps: IComponentsState[]): void {
        
        // First step of the fetch cycle

        let step1: IComponentsState = { ...steps[steps.length - 1] };
        
        step1.ac_on = false;
        step1.cal_ac = false;

        this.mar.storage(this.pc.read());

        step1.pc_mar = true;
        step1.mar = this.mar.read();
        step1.mar_on = true;

        steps.push(step1);

        // Second step of the fetch cycle

        let step2 = { ...steps[steps.length - 1] };

        step2.mar_on = false;
        step2.pc_mar = false;

        this.ibr.storage(memory.read(this.mar.read())!);
        
        step2.mar_memory = true;
        step2.address_memory_on = this.mar.read();
        step2.memory_mbr = true;
        step2.mbr_ibr = true;
        step2.ibr = this.ibr.read();
        step2.ibr_on = true;

        steps.push(step2);
        
        // Third step of the fetch cycle

        let step3: IComponentsState = { ...steps[steps.length - 1] };

        step3.mar_memory = false;
        step3.address_memory_on = null;
        step3.memory_mbr = false;
        step3.mbr_ibr = false;
        step3.ibr_on = false;

        let aux = (parseInt(this.pc.read(), 2) + 1).toString(2);
        this.pc.storage("0".repeat(4 - aux.length) + aux);

        step3.pc = this.pc.read();
        step3.pc_on = true;

        steps.push(step3);
    }

    
    /**
     * The `decode` function processes a series of steps to decode instructions and
     * update the state of components accordingly.
     * @param {IComponentsState[]} steps - The `decode` function takes an array of `IComponentsState`
     * objects as input, represented by the `steps` parameter. The function performs a series of
     * operations on the last element of the `steps` array and then returns the value of the `ir`
     * property of that element.
     * @returns The `decode` function is returning the value of `this.ir.read()`.
     */
    decode(steps: IComponentsState[]): string {
        
        // First step of the decode cycle

        let step1: IComponentsState = { ...steps[steps.length - 1] };
        
        step1.pc_on = false;
        step1.ibr_on = false;

        this.ir.storage(this.ibr.read());

        step1.ibr_ir = true;
        step1.ir = this.ibr.read();
        step1.ir_on = true;

        switch (this.ir.read().slice(0, 4)) {
            case "0000":
                step1.codop = "+";
                break;
            case "0001":
                step1.codop = "-";
                break;
            case "0010":
                step1.codop = "/";
                break;
            case "0011":
                step1.codop = "*";
                break;
            case "0100":
                step1.codop = "SAVE";
                break;
            case "0101":
                step1.codop = "END";
                break;
        }

        step1.codop_on = true;

        steps.push(step1);

        return this.ir.read();
    }

    /**
     * The function executes instructions using an Arithmetic Logic Unit (ALU) and Memory components in
     * a simulated computer system, handling different opcodes for operations like addition,
     * subtraction, division, multiplication, and memory storage.
     * @param {string} instruction - The `execute` function use an Arithmetic Logic Unit (ALU) and Memory components.
     * The function takes an instruction as input and performs different operations based on the opcode
     * extracted from the instruction.
     * @param {ALU} alu - ALU (Arithmetic Logic Unit) is a component of a CPU that performs arithmetic
     * and logical operations on the operands provided by the instruction.
     * @param {Memory} memory - Memory is an object representing the memory unit in a computer system.
     * It stores data and instructions that are being processed by the CPU. The `memory` object 
     * has methods `read(address)` to retrieve data from a specific memory address and
     * `write(address, data)` to store data at a specific
     * @param {IComponentsState[]} steps - steps is an array of IComponentsState objects representing
     * the state of various components in the system at different steps of the execution cycle. Each
     * IComponentsState object contains properties indicating the status of different components such
     * as registers, memory, and control signals. The array keeps track of the state of the components
     * as
     * @returns The `execute` function returns a boolean value. It returns `true` if the execution of
     * the instruction was successful without encountering any errors, and it returns `false` if there
     * was an error during execution or if the program needs to stop due to specific conditions like
     * overflow, underflow, or division by zero.
     */
    execute(instruction: string, alu: ALU, memory: Memory, steps: IComponentsState[]): boolean {

        let opcode = instruction.slice(0, 4);
        let address = instruction.slice(4, 8);

        let value: string | null;
        let result: boolean | string;

        // First step of the execute cycle
        
        let step1: IComponentsState = { ...steps[steps.length - 1] };
        
        step1.codop_on = false;
        step1.ir_on = false;
        step1.ibr_ir = false;

        step1.address_memory_on = address;

        switch (opcode) {
            case "0000":
                value = memory.read(address);

                step1.memory_mbr = true;
                step1.mbr_cal = true;
                step1.re = value!;
                step1.re_on = true;
                step1.cal_on = true;
                step1.ac_cal = true;

                steps.push(step1);

                // Step execute-storage cycle
                
                let step2a: IComponentsState = { ...steps[steps.length - 1] };

                step2a.memory_mbr = false;
                step2a.mbr_cal = false;
                step2a.ac_cal = false;
                step2a.re_on = false;
                step2a.cal_on = false;
                step2a.address_memory_on = null;

                step2a.cal_ac = true;

                result = alu.add(value!, step2a);

                steps.push(step2a);
        
                break;
            case "0001":
                value = memory.read(address);

                step1.memory_mbr = true;
                step1.mbr_cal = true;
                step1.re = value!;
                step1.re_on = true;
                step1.cal_on = true;
                step1.ac_cal = true;

                steps.push(step1);

                // Step execute-storage cycle
                
                let step2s: IComponentsState = { ...steps[steps.length - 1] };

                step2s.memory_mbr = false;
                step2s.mbr_cal = false;
                step2s.ac_cal = false;
                step2s.re_on = false;
                step2s.cal_on = false;
                step2s.address_memory_on = null;

                step2s.cal_ac = true;

                result = alu.subtract(value!, step2s);

                steps.push(step2s);

                break;
            case "0010":
                value = memory.read(address);

                step1.memory_mbr = true;
                step1.mbr_cal = true;
                step1.re = value!;
                step1.re_on = true;
                step1.cal_on = true;
                step1.ac_cal = true;

                steps.push(step1);

                // Step execute-storage cycle
                
                let step2d: IComponentsState = { ...steps[steps.length - 1] };

                step2d.memory_mbr = false;
                step2d.mbr_cal = false;
                step2d.ac_cal = false;
                step2d.re_on = false;
                step2d.cal_on = false;
                step2d.address_memory_on = null;

                step2d.cal_ac = true;

                result = alu.divide(value!, step2d);

                steps.push(step2d);
                
                break;
            case "0011":
                value = memory.read(address);

                step1.memory_mbr = true;
                step1.mbr_cal = true;
                step1.re = value!;
                step1.re_on = true;
                step1.cal_on = true;
                step1.ac_cal = true;

                steps.push(step1);

                // Step execute-storage cycle
                
                let step2m: IComponentsState = { ...steps[steps.length - 1] };

                step2m.memory_mbr = false;
                step2m.mbr_cal = false;
                step2m.ac_cal = false;
                step2m.re_on = false;
                step2m.cal_on = false;
                step2m.address_memory_on = null;

                step2m.cal_ac = true;

                result = alu.multiply(value!, step2m);

                steps.push(step2m);
                
                break;
            case "0100":
                step1.ac_on = true;
                step1.ac_cal = true;
                step1.cal_mbr = true;
                step1.memory_mbr = true;

                result = this.store(memory, alu, address, step1);
                
                steps.push(step1);

                return false;
            case "0101":
                alu.end();
                result = false;
                return false;
            default:
                console.log("Error: INVALID OPCODE");
                return false;
        }
        

        if (["OVERFLOW", "UNDERFLOW", "DIVIDE_BY_ZERO"].includes(result as string)) {
            console.log("The program has stopped due to an error");
            return false;
        }

        return true;
    }

    /**
     * The function stores the current state of components in memory at a specified address and updates
     * the address memory state.
     * @param {Memory} memory - Memory is an object representing the memory unit in a computer system.
     * It stores data and instructions that are currently being processed by the CPU.
     * @param {ALU} alu - ALU stands for Arithmetic Logic Unit. It is a fundamental component of a
     * computer's central processing unit (CPU) that performs arithmetic and logical operations on
     * data.
     * @param {string} address - The `address` parameter in the `store` function is a string that
     * represents the memory address where the data will be stored.
     * @param {IComponentsState} step - `step` is an object representing the current state of the
     * components in the system. It contains information such as the address of the memory being
     * accessed and other relevant data for the operation being performed.
     * @returns The function `store` is returning a boolean value `true`.
     */
    store(memory: Memory, alu: ALU, address: string, step: IComponentsState): boolean {
        alu.save(memory, address, step);
        
        step.address_memory_on = address;

        return true;
    }
}
