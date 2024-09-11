/* The Register class in TypeScript represents a storage unit with methods to store and read a string
value. */
export class Register {
    private value: string;

    constructor(value: string = "0000") {
        this.value = value;
    }

   /**
    * The function "storage" in TypeScript sets a value to a string property.
    * @param {string} value - The `storage` function takes a parameter `value` of type string and
    * stores it in the object's `value` property.
    */
    storage(value: string): void {
        this.value = value;
    }

    /**
     * The `read` function in TypeScript returns a string value.
     * @returns The `read()` method is returning a string value stored in the `value` property of the
     * object.
     */
    read(): string {
        return this.value;
    }
}
