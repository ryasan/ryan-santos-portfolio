export type ClientHint<Value> = {
	cookieName: string
	fallback: Value
	getValueCode: string
	transform?: (value: string) => Value
}

export type ClientHintsValue<ClientHintsRecord> = {
	[K in keyof ClientHintsRecord]: ClientHintsRecord[K] extends ClientHint<
		infer Value
	>
		? ClientHintsRecord[K]['transform'] extends (value: string) => Value
			? ReturnType<ClientHintsRecord[K]['transform']>
			: ClientHintsRecord[K]['fallback']
		: never
}
