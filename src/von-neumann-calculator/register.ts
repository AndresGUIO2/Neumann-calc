export class Register {
    private value: string;

    constructor(value: string = "0000") {
        this.value = value;
    }

    storage(value: string): void {
        this.value = value;
    }

    read(): string {
        return this.value;
    }
}
