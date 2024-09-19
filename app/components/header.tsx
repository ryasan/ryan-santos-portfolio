import clsx from 'clsx';
import { usePointerFollower } from '~/context/pointer-follower-context';
import SectionLayout from '~/components/section-layout';

const ns = 'site-header';

export default function Header() {
	const rootClassName = clsx({
		[`${ns}`]: true,
	});

	const { toggleMixBlendMode } = usePointerFollower();

	return (
		<SectionLayout
			className={rootClassName}
			as="header"
			onMouseEnter={() => toggleMixBlendMode(true)}
		>
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
		</SectionLayout>
	);
}
