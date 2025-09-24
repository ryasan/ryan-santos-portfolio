import { json, type ActionFunctionArgs } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { useForm, getFormProps } from '@conform-to/react'

import Image from '~/components/image'
import { invariantResponse } from '~/utils'
import { setTheme } from '~/services/theme.server'
import { type Theme } from '~/types'

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const theme = formData.get('theme')

	invariantResponse(theme === 'light' || theme === 'dark', 'Invalid theme')

	const responseInit = {
		headers: { 'set-cookie': setTheme(theme) },
	}
	return json({ result: theme }, responseInit)
}

export function ThemeToggle({
	userPreference,
}: {
	userPreference?: Theme | null
}) {
	const fetcher = useFetcher<typeof action>()

	const [form] = useForm({
		id: 'theme-toggle',
		lastResult: fetcher.data?.result as any,
	})

	const mode = userPreference ?? 'system'
	const nextMode =
		mode === 'system' ? 'light' : mode === 'light' ? 'dark' : 'system'
	const modeLabel = {
		light: (
			<div>
				<Image src="/public/images/sun.svg" alt="Light" />
				<span className="sr-only">Light</span>
			</div>
		),
		dark: (
			<div>
				<Image src="/public/images/moon.svg" alt="Dark" />
				<span className="sr-only">Dark</span>
			</div>
		),
		system: (
			<div>
				<Image src="/public/images/laptop.svg" alt="System" />
				<span className="sr-only">System</span>
			</div>
		),
	}

	return (
		<fetcher.Form
			method="POST"
			{...getFormProps(form)}
			action="/resources/theme-toggle"
		>
			<input type="hidden" name="theme" value={nextMode} />
			<div>
				<button type="submit">{modeLabel[mode]}</button>
			</div>
		</fetcher.Form>
	)
}
