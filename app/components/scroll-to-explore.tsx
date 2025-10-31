import clsx from 'clsx'
import styles from '~/styles/components/scroll-to-explore.module.scss'
import { ArrowRightIcon } from '~/components/icons'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

type ScrollToExploreProps = {
	children?: React.ReactNode
}

export default function ScrollToExplore({ children }: ScrollToExploreProps) {
	const scrollToExploreRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		const scrollToExplore = scrollToExploreRef.current

		if (!scrollToExplore) return

		gsap.to(scrollToExplore, {
			opacity: 1,
			duration: 1,
			ease: 'power2.out',
			delay: 0.75,
		})
	})

	return (
		<div
			className={clsx(styles.scrollToExplore, 'scroll-to-explore', 'link')}
			ref={scrollToExploreRef}
		>
			<span>{children || 'Scroll To Explore'}</span>
			<ArrowRightIcon className={styles.arrowRightIcon} />
		</div>
	)
}
