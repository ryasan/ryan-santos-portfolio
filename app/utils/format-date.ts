export const formatDate = (inputDate: string) => {
	if (!inputDate) return ''

	// If it's a malformed ISO string, try to fix it first
	let dateString = inputDate
	if (inputDate.includes('T') && inputDate.endsWith('-2024')) {
		// Handle malformed format: 09-17T00:00:00.000Z-2024
		const year = inputDate.split('-').pop()
		const monthDay = inputDate.split('T')[0]
		dateString = `${year}-${monthDay}T00:00:00.000Z`
	}

	const date = new Date(dateString)
	if (isNaN(date.getTime())) return ''

	// Use UTC methods to avoid timezone offset issues
	const month = String(date.getUTCMonth() + 1).padStart(2, '0')
	const day = String(date.getUTCDate()).padStart(2, '0')
	const year = date.getUTCFullYear()

	return `${month}-${day}-${year}`
}
