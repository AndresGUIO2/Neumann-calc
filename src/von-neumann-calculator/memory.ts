/* The class Memory in TypeScript represents a memory storage system with methods to store and read
values at specific addresses. */
export class Memory {
    memory: { [key: string]: string | null };

    /**
     * The constructor initializes a memory object with 16 key-value pairs, where the keys are binary
     * strings and the values are initially set to null.
     */
    constructor() {
        this.memory = {
            "0000": null,
            "0001": null,
            "0010": null,
            "0011": null,
            "0100": null,
            "0101": null,
            "0110": null,
            "0111": null,
            "1000": null,
            "1001": null,
            "1010": null,
            "1011": null,
            "1100": null,
            "1101": null,
            "1110": null,
            "1111": null,
        };
    }

    /**
     * The function `storage` stores a value in memory at a specified address.
     * @param {string} address - The `address` parameter in the `storage` function is a string that
     * represents the memory address where the `value` will be stored.
     * @param {string} value - The `value` parameter in the `storage` function represents the data that
     * will be stored at the specified `address` in memory.
     */
    storage(address: string, value: string): void {
        this.memory[address] = value;
    }

    /**
     * The `read` function in TypeScript takes an address as input and returns the corresponding value
     * from memory, or null if the address is not found.
     * @param {string} address - The `read` function takes an `address` parameter, which is a string
     * representing the memory address from which you want to read data. The function returns the data
     * stored at that memory address as a string, or `null` if the address does not contain any data.
     * @returns The `read` function is returning the value stored in the `memory` object at the
     * specified `address`. The return type of the function is a string or `null`.
     */
    read(address: string): string | null {
        return this.memory[address];
    }
}
