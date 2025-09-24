import { json, type ActionFunctionArgs } from '@remix-run/node'
import { invariantResponse } from '~/utils'
import { setTheme } from '~/services/theme.server'

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const theme = formData.get('theme')

	invariantResponse(theme === 'light' || theme === 'dark', 'Invalid theme')

	const responseInit = {
		headers: { 'set-cookie': setTheme(theme) },
	}
	return json({ result: theme }, responseInit)
}
