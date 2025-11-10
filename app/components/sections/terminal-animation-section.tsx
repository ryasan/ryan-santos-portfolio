import clsx from 'clsx'
import gsap from 'gsap'
import styles from '~/styles/components/sections/terminal-animation-section.module.scss'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

export default function TerminalAnimationSection() {
	const sectionRef = useRef<HTMLElement>(null)
	const terminalRef = useRef<HTMLDivElement>(null)
	const terminalBodyRef = useRef<HTMLDivElement>(null)
	const terminalContentRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		const section = sectionRef.current
		const terminal = terminalRef.current
		const terminalBody = terminalBodyRef.current
		const terminalContent = terminalContentRef.current

		if (!section || !terminal || !terminalBody || !terminalContent) return

		const contentHeight = terminalContent.offsetHeight
		const bodyHeight = terminalBody.offsetHeight
		const scrollDistance = contentHeight - bodyHeight

		ScrollTrigger.create({
			trigger: section,
			pin: terminal,
			start: 'top top',
			end: 'bottom bottom',
			pinSpacing: false,
			anticipatePin: 1,
			markers: true,
		})

		gsap.to(terminalContent, {
			y: -scrollDistance,
			ease: 'none',
			scrollTrigger: {
				trigger: section,
				start: 'top top',
				end: 'bottom bottom',
				scrub: 1,
			},
		})
	}, [])

	return (
		<section className={styles.terminalAnimationSection} ref={sectionRef}>
			<div className="container">
				<div className={styles.terminal} ref={terminalRef}>
					<div className={styles.header}>
						<h1 className={clsx(styles.title, 'badge')}>Terminal</h1>
					</div>
					<div className={styles.body} ref={terminalBodyRef}>
						<div className={styles.content} ref={terminalContentRef}>
							<p className={styles.text}>
								<span className={styles.arrow}>➜&nbsp;</span>
								<span className={clsx(styles.highlight, styles.bold)}>Sites&nbsp;</span>
								<span>npm create new-project</span>
							</p>
						</div>
					</div>
				</div>
				<div className={styles.spacer} />
			</div>
		</section>
	)
}
