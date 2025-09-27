export const gql = (query: TemplateStringsArray, ...args: string[]): string => {
	let result = ''

	for (let i = 0; i < query.length; i++) {
		result += query[i]

		if (i < args.length) {
			result += args[i]
		}
	}

	return result
}
