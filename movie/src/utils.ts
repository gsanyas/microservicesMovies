const isArrayOfStrings = (value: any): boolean =>
    Array.isArray(value) && value.every((item) => typeof item === "string")

const isArrayOfNumbers = (value: any): boolean =>
    Array.isArray(value) && value.every((item) => typeof item === "number")

const copyArray = (array: any[]): any[] => JSON.parse(JSON.stringify(array))

export { copyArray, isArrayOfStrings, isArrayOfNumbers }
