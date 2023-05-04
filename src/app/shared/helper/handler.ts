export const clearObjectRef = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
}

export const jsonToString = <T>(json: T): string => {
    return JSON.stringify(json);
}

export const stringToJson = <T>(str: string): T => {
    return JSON.parse(str);
}