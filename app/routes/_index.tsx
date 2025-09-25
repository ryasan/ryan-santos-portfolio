import { redirect } from '@remix-run/node'

export async function loader() {
	return redirect('/home')
}

export default function Index() {
	return null
}
