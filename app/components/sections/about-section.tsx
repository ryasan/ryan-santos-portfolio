import clsx from 'clsx'
import {
	frame,
	motion,
	useMotionValue,
	useSpring,
	useTransform,
	useInView,
} from 'framer-motion'
import { useRef, useState } from 'react'
import Button from '~/components/button'
import SectionLayout from '~/components/section-layout'
import { wait } from '~/utils'

const ns = 'about-section'

const aboutItems = [
	// {
	// 	title: 'Development',
	// 	description:
	// 		'I like to code things from scratch, and enjoy bringing ideas to life in the browser.',
	// },
	// {
	// 	title: 'Design',
	// 	description:
	// 		'I value simple content structure, clean design patterns, and thoughtful interactions.',
	// },
	// {
	// 	title: 'E-commerce',
	// 	description:
	// 		'I have experience working with e-commerce platforms like Shopify and Elastic Path.',
	// },
	// {
	// 	title: 'Content Management',
	// 	description:
	// 		'I have experience working with content management systems like WordPress and Contentful.',
	// },
	{
		title: 'Lorem Ipsum',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.',
	},
	{
		title: 'Lorem Ipsum',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.',
	},
	{
		title: 'Lorem Ipsum',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.',
	},
	{
		title: 'Lorem Ipsum',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.',
	},
]

function AboutItem({
	title,
	description,
}: {
	title: string
	description: string
}) {
	const svgRef = useRef<SVGSVGElement>(null)
	const pathRef = useRef<SVGPathElement>(null)
	const isInView = useInView(pathRef, { once: true, amount: 0 })
	const x = useMotionValue(561.5) // Initial value is the center of the SVG
	const y = useMotionValue(75) // Initial value is the center of the SVG

	const xSpring = useSpring(x, {
		stiffness: 500,
		damping: 10,
		restDelta: 0.01,
	})

	const ySpring = useSpring(y, {
		stiffness: 500,
		damping: 10,
		restDelta: 0.01,
	})

	function handleMouseMove(event: React.MouseEvent) {
		const svgElement = svgRef.current!
		const rect = svgElement.getBoundingClientRect()
		const mouseX = event.pageX - window.pageXOffset - rect.left
		const mouseY = event.pageY - window.pageYOffset - rect.top

		frame.read(() => {
			x.set(mouseX)
			y.set(mouseY)
		})
	}

	function handleMouseLeave() {
		const svgElement = svgRef.current!
		const rect = svgElement.getBoundingClientRect()
		const mouseX = rect.width / 2
		const mouseY = rect.height / 2

		frame.read(() => {
			x.set(mouseX)
			y.set(mouseY)
		})
	}

	const d = useTransform([xSpring, ySpring], ([latestX, latestY]) => {
		return `M0,75 Q${latestX},${latestY} 950,75`
	})

	return (
		<div className={`${ns}__item`}>
			<div
				className={`${ns}__item-divider`}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
			>
				<motion.svg
					ref={svgRef}
					animate={{ width: isInView ? '100%' : '0%' }}
					transition={{ duration: 1 }}
				>
					<motion.path ref={pathRef} d={d} />
				</motion.svg>
			</div>
			<div className={`${ns}__item-text`}>
				<h3 className={`${ns}__item-title p`}>{title}</h3>
				<p className={`${ns}__item-description small`}>{description}</p>
			</div>
		</div>
	)
}

export default function AboutSection() {
	const rootClassName = clsx({
		[`${ns}`]: true,
	})

	const rootRef = useRef(null)
	const [copyBtnPressed, setCopyBtnPressed] = useState(false)

	async function handleCopyEmail() {
		setCopyBtnPressed(true)
		await navigator.clipboard.writeText('ryansantos86@gmail.com')
		await wait(2500)
		setCopyBtnPressed(false)
	}

	return (
		<SectionLayout
			className={rootClassName}
			ref={rootRef}
			as="section"
			cursorColor="inverse"
		>
			<div className={`${ns}__inner`}>
				<div className="container">
					<div className={`${ns}__content`}>
						<div
							className={`${ns}__content-left`}
							data-scroll
							data-scroll-speed="3"
						>
							<h3 className={`${ns}__cta-title h5`}>#003</h3>
							<div className={`${ns}__cta`}>
								<Button as="a" href="/" variant="outline-black">
									Dowload CV
								</Button>
							</div>
							<div className={`${ns}__cta`}>
								<Button href="/" onClick={handleCopyEmail} variant="outline-black">
									{copyBtnPressed ? 'Copied!' : 'Copy Email'}
								</Button>
							</div>
						</div>

						<div className={`${ns}__content-right`}>
							<h2 className={`${ns}__title h1`}>
								<div>
									What <i>I Do</i>
								</div>
							</h2>
							<div className={`${ns}__items`}>
								{aboutItems.map((item, index) => (
									<AboutItem key={index} {...item} />
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</SectionLayout>
	)
}
