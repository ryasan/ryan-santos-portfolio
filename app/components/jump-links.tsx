import clsx from 'clsx'
import { type PagePageSectionsItem } from '~/graphql/__generated/sdk'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'

const ns = 'jump-links'
const HEADER_HEIGHT = '68px'

type JumpLinksProps = {
	sections: PagePageSectionsItem[]
}

export default function JumpLinks({ sections }: JumpLinksProps) {
	const jumpLinksRef = useRef<HTMLElement>(null)

	const [activeSectionId, setActiveSectionId] = useState('')

	const sectionsWithJumpLinkLabels = sections.filter((section) =>
		Boolean('jumpLinkLabel' in section && section.jumpLinkLabel !== null),
	)

	const getSectionId = (section: PagePageSectionsItem) =>
		'jumpLinkLabel' in section && section.jumpLinkLabel
			? section.jumpLinkLabel
			: null

	const handleClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		section: PagePageSectionsItem,
	) => {
		e.preventDefault()

		const sectionId = getSectionId(section)
		if (!sectionId) return

		const element = document.getElementById(sectionId)
		const smoother = ScrollSmoother.get()

		if (element && smoother) {
			smoother.scrollTo(element, true, `top ${HEADER_HEIGHT}`)
		}
	}

	useEffect(() => {
		if ('scrollRestoration' in window.history) {
			window.history.scrollRestoration = 'manual'
		}

		window.history.replaceState(
			null,
			'',
			window.location.pathname + window.location.search,
		)
		window.scrollTo(0, 0)
		ScrollSmoother.get()?.scrollTo(0)
	}, [])

	useGSAP(() => {
		const jumpLinks = jumpLinksRef.current

		if (!jumpLinks) return

		gsap.to(jumpLinks, {
			duration: 1,
			ease: 'power2.out',
			opacity: 1,
		})
	}, [])

	useGSAP(() => {
		const triggers = sectionsWithJumpLinkLabels
			.map((section) => {
				const sectionId = getSectionId(section)
				if (!sectionId) return null

				const element = document.getElementById(sectionId)

				if (!element) return null

				return ScrollTrigger.create({
					end: 'bottom center',
					onEnter: () => setActiveSectionId(sectionId),
					onEnterBack: () => setActiveSectionId(sectionId),
					start: 'top center',
					trigger: element,
				})
			})
			.filter((trigger): trigger is ScrollTrigger => trigger !== null)

		return () => {
			triggers.forEach((trigger) => trigger.kill())
		}
	}, [sectionsWithJumpLinkLabels])

	useEffect(() => {
		if (!activeSectionId) return

		window.history.replaceState(null, '', `#${activeSectionId}`)
	}, [activeSectionId])

	return (
		<nav aria-label="Page sections" className={ns} ref={jumpLinksRef}>
			{sectionsWithJumpLinkLabels.map((section) => {
				const sectionId = getSectionId(section)
				if (!section?.sys?.id || !sectionId) return null

				const label = sectionId
				const isActive = activeSectionId === sectionId

				return (
					<a
						aria-current={isActive ? 'true' : undefined}
						className={clsx(`${ns}__link`, isActive && 'active')}
						href={`#${sectionId}`}
						key={section.sys.id}
						onClick={(e) => handleClick(e, section)}
						style={{ ['--label-len' as string]: label.length }}
					>
						<span className={`${ns}__inner`}>
							{label}
							<span aria-hidden className={`${ns}__tick`} />
						</span>
					</a>
				)
			})}
		</nav>
	)
}
