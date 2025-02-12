export function isArray(value: any): value is any[] {
	return Array.isArray(value)
}

export function isBoolean(value: any): value is boolean {
	return typeof value === 'boolean'
}

export function isDate(value: any): value is Date {
	return value instanceof Date
}

export function isFunction(value: any): value is Function {
	return typeof value === 'function'
}

export function isNullOrUndefined(value: any): value is null | undefined {
	return value === null || value === undefined
}

export function isNumber(value: any): value is number {
	return typeof value === 'number'
}

export function isObject(value: any): value is Record<string, any> {
	return value !== null && typeof value === 'object'
}

export function isPromise(value: any): value is Promise<any> {
	return value instanceof Promise
}

export function isString(value: any): value is string {
	return typeof value === 'string'
}

export function isSymbol(value: any): value is symbol {
	return typeof value === 'symbol'
}
