import clsx from 'clsx';

const ns = 'site-header';

export default function Header() {
	const rootClassName = clsx({
		[`${ns}`]: true,
	});

	return (
		<header className={rootClassName} data-scroll-section>
			<div className="container-fluid">
				<span className={`${ns}__title`}>
					<small>Ryan</small>
					<small>Santos.</small>
				</span>
				<nav className={`${ns}__nav`}>
					<span className={`${ns}__menu-text`}>
						<small>menu</small>
					</span>
				</nav>
			</div>
		</header>
	);
}
