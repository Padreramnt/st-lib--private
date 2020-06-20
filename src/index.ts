export function createProperty<T>(): [(target: object) => T, (target: object, value: T) => T] {
	const table = new WeakMap<object, T>()
	return [
		(target) => {
			if (!table.has(target)) throw new ReferenceError(`Property not defined`)
			return table.get(target)!
		},
		(target, value) => {
			table.set(target, value)
			return value
		}
	]
}

export function createMethod<A extends any[] = [], R = void>(): [(target: object, ...args: A) => R, <C extends object>(target: C, method: (this: C, ...args: A) => R) => void] {
	const table = new WeakMap<object, (...args: A) => R>()
	return [
		(target, ...args) => {
			if (!table.has(target)) throw new ReferenceError(`Method not defined`)
			return table.get(target)!.apply(target, args)
		},
		(target, method) => {
			if (table.has(target)) throw new ReferenceError(`Method defined`)
			table.set(target, method)
		},
	]
}
