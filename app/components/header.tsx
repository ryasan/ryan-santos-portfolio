import ThemeToggle from '~/components/theme-toggle'
import clsx from 'clsx'
import gsap from 'gsap'
import { type GlobalHeader } from '~/graphql/__generated/sdk'
import { LIGHT_THEME, DARK_THEME } from '~/utils/constants'
import { Link as RemixLink, NavLink } from '@remix-run/react'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

const ns = 'header'

type HeaderProps = {
	data?: GlobalHeader
}

export default function Header({ data }: HeaderProps) {
	const headerRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		const header = headerRef.current
		if (!header) return

		gsap.to(header, {
			duration: 1,
			ease: 'power2.out',
			opacity: 1,
		})
	}, [])

	return (
		<header className={ns} ref={headerRef}>
			<div className="container">
				<div className={`${ns}__inner`}>
					<RemixLink aria-label="Home page" className={`${ns}__logo`} to="/">
						<div data-hide-on-theme={DARK_THEME}>
							<span className={`${ns}__logo-text`}>Ryan.</span>
						</div>
						<div data-hide-on-theme={LIGHT_THEME}>
							<span className={`${ns}__logo-text`}>Ryan.</span>
						</div>
					</RemixLink>
					<div className={`${ns}__navigation-box`}>
						<nav className={`${ns}__navigation`}>
							{data?.menuItemsCollection?.items?.map((item) => {
								if (!item) return null

								return (
									<NavLink
										className={({ isActive }) =>
											clsx(`${ns}__link`, 'link', isActive && 'active')
										}
										key={item.label}
										to={item.internalPage?.slug || item.url || ''}
									>
										{item.label}
									</NavLink>
								)
							})}
						</nav>
						<ThemeToggle />
					</div>
				</div>
			</div>
		</header>
	)
}
