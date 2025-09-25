import { redirect } from '@remix-run/node'

export async function loader() {
	return redirect('/home')
}

export default function Index() {
	return (
		<div>
			<h1>Welcome to the root page!</h1>
			<p>This will not be shown if the loader redirects to /home.</p>
		</div>
	)
}
