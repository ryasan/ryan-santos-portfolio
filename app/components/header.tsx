import ThemeToggle from '~/components/theme-toggle'
import clsx from 'clsx'
import styles from '~/styles/components/header.module.scss'
import { GlobalHeader } from '~/types'
import { LIGHT_THEME, DARK_THEME } from '~/utils/constants'
import { Link as RemixLink, NavLink } from '@remix-run/react'

type HeaderProps = {
	data?: GlobalHeader
}

export default function Header({ data }: HeaderProps) {
	return (
		<header className={styles.header}>
			<RemixLink className={styles.logo} to="/" aria-label="Home page">
				<div data-hide-on-theme={DARK_THEME}>
					{data?.logoImageLightMode?.url && (
						<img
							src={data?.logoImageLightMode?.url}
							alt={data?.logoImageLightMode?.title || 'Ryan Santos Portfolio logo'}
						/>
					)}
				</div>
				<div data-hide-on-theme={LIGHT_THEME}>
					{data?.logoImageDarkMode?.url && (
						<img
							src={data?.logoImageDarkMode?.url}
							alt={data?.logoImageDarkMode?.title || 'Ryan Santos Portfolio logo'}
						/>
					)}
				</div>
			</RemixLink>
			<div className={styles.navigationBox}>
				<nav className={styles.navigation}>
					{data?.menuItemsCollection?.items?.map((item) => {
						const itemUrl = item.internalPage?.slug || item.url
						if (!itemUrl || !item.label) return null

						return (
							<NavLink
								key={item.label}
								to={itemUrl}
								className={({ isActive }) =>
									clsx('link', styles.link, isActive && styles.activeLink)
								}
							>
								{item.label}
							</NavLink>
						)
					})}
				</nav>
				<ThemeToggle />
			</div>
		</header>
	)
}
