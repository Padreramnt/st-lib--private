# Utility for creating private properties and methods.

```ts
import { createProperty, createMethod } from '@st-lib/private'

const [getProperty, setProperty] = createProperty<string>()
const [method, defineMethod] = createMethod<[string], string>()

class Class {
	constructor() {
		setProperty(this, 'init property value')
		defineMethod(this, (value) => value.toUpperCase())
	}

	publicMethod() {
		const value = getProperty(this) // thows ReferenceError if property not defined
		const preparedValue = method(this, value) // thows ReferenceError if method not defined
		return preparedValue
	}
}
```
