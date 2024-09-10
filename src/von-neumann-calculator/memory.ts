export class Memory {
    memory: { [key: string]: string | null };

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

    storage(address: string, value: string): void {
        this.memory[address] = value;
    }

    read(address: string): string | null {
        return this.memory[address];
    }
}
