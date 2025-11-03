import clsx from 'clsx'
import styles from '~/styles/components/scroll-to-explore.module.scss'
import { ArrowRightIcon } from '~/components/icons'

type ScrollToExploreProps = {
	children?: React.ReactNode
}

export default function ScrollToExplore({ children }: ScrollToExploreProps) {
	return (
		<div
			className={clsx(styles.scrollToExplore, 'scroll-to-explore', 'link')}
			data-no-smooth
		>
			<span>{children || 'Scroll To Explore'}</span>
			<ArrowRightIcon className={styles.arrowRightIcon} />
		</div>
	)
}
