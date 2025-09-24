import { json, type ActionFunctionArgs } from '@remix-run/node'
import { setTheme } from '~/services/theme.server'

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const theme = formData.get('theme')

	const validTheme = theme === 'light' || theme === 'dark' ? theme : 'light'

	const responseInit = {
		headers: { 'set-cookie': setTheme(validTheme) },
	}
	return json({ result: theme }, responseInit)
}
