import Link from '~/components/link'
import clsx from 'clsx'
import styles from '~/styles/components/jump-links.module.scss'
import { PagePageSectionsItem } from '~/graphql/__generated/sdk'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useLocation } from '@remix-run/react'
import { useRef } from 'react'

type JumpLinksProps = {
	sections: PagePageSectionsItem[]
}

export default function JumpLinks({ sections }: JumpLinksProps) {
	const jumpLinksRef = useRef<HTMLDivElement>(null)
	const location = useLocation()
	const hash = location.hash
	const hashWithoutHash = hash.slice(1)

	const handleClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		section: PagePageSectionsItem,
	) => {
		e.preventDefault()

		const element = document.getElementById(section.sys.id)
		const smoother = ScrollSmoother.get()

		if (element && smoother) {
			smoother.scrollTo(element, true, 'top top')
		}
	}

	useGSAP(() => {
		const jumpLinks = jumpLinksRef.current

		if (!jumpLinks) return

		gsap.to(jumpLinks, {
			opacity: 1,
			duration: 1,
			ease: 'power2.out',
			delay: 0.75,
		})
	}, [])

	return (
		<div className={styles.jumpLinks} ref={jumpLinksRef}>
			{sections.map((section, index) => {
				if (!section?.sys?.id) return null

				const isActive = hashWithoutHash === section.sys.id

				return (
					<Link
						className={clsx(styles.link, isActive && styles.active)}
						key={section.sys.id}
						to={`#${section.sys.id}`}
						onClick={(e) => handleClick(e, section)}
					>{`${index < 10 ? '0' : ''}${index + 1}`}</Link>
				)
			})}
		</div>
	)
}
