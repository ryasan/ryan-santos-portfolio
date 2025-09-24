import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'
import GlobalLayout from '~/components/global-layout'

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>

			<body>
				<GlobalLayout>
					<Outlet />
				</GlobalLayout>
				<ScrollRestoration />
				<Scripts />
				{/* Prevent theme flash by setting theme before React hydrates */}
				<script
					dangerouslySetInnerHTML={{
						__html: `
							(function() {
								const theme = localStorage.getItem('theme') || 'dark';
								document.documentElement.dataset.theme = theme;
							})();
						`,
					}}
				/>
			</body>
		</html>
	)
}
