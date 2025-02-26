export function callAll(...fns: Function[]) {
	return (...args: any[]) => fns.forEach((fn) => fn && fn(...args))
}
