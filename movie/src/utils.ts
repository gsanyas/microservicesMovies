const isArrayOfStrings = (value: any): boolean =>
    Array.isArray(value) && value.every((item) => typeof item === "string")

const isArrayOfNumbers = (value: any): boolean =>
    Array.isArray(value) && value.every((item) => typeof item === "number")

export { isArrayOfStrings, isArrayOfNumbers }
