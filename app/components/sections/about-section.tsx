import {
	EnvelopeIcon,
	GithubIcon,
	HtmlIcon,
	InterfaceIcon,
	LinkedinIcon,
	ReactIcon,
	WordpressIcon,
} from '~/components/icons'
import { type ComponentType, type SVGProps } from 'react'
import clsx from 'clsx'
import styles from './about-section.module.css'


const socialLinks = [
	{
		href: 'https://www.linkedin.com/in/ryasan/',
		icon: LinkedinIcon,
		label: 'LinkedIn',
	},
	{
		href: 'https://github.com/ryasan',
		icon: GithubIcon,
		label: 'Github',
	},
	{
		href: 'mailto:ryansantos.dev@gmail.com',
		icon: EnvelopeIcon,
		label: 'Email',
	},
] as const

const skills: {
	description: string
	icon: ComponentType<SVGProps<SVGSVGElement>>
	title: string
	uppercase?: boolean
}[] = [
	{
		description: 'Pixel-perfect, modular design systems.',
		icon: InterfaceIcon,
		title: 'UI Architecture',
	},
	{
		description: 'Certified WCAG and semantic HTML.',
		icon: HtmlIcon,
		title: 'Web Accessibility',
	},
	{
		description: 'High-performance TypeScript apps.',
		icon: ReactIcon,
		title: 'React & Next.js',
	},
	{
		description: 'Scalable Contentful and Shopify setups.',
		icon: WordpressIcon,
		title: 'Headless Systems',
	},
]

const experienceColumns = [
	{
		items: [
			'React & Next.js',
			'TypeScript & JavaScript',
			'Tailwind CSS & ShadCN',
			'REST & GraphQL APIs',
			'State management',
			'Git & CI/CD',
			'Cypress & Jest testing',
			'HTML5 & CSS3',
		],
		title: 'Core Skills',
	},
	{
		items: [
			'Design systems',
			'WCAG accessibility',
			'Contentful & headless CMS',
			'Shopify (headless & Liquid)',
			'Agile / Scrum',
			'Figma collaboration',
			'Pixel-perfect UI',
			'A/B testing',
		],
		title: 'Agency Work',
	},
	{
		items: [
			'AI-assisted coding',
			'Prompt engineering',
			'Three.js & R3F',
			'WebGL & shaders',
			'Performance tuning',
			'Auth0',
			'i18n & multi-locale',
			'Edge runtimes',
		],
		title: 'Going Deeper',
	},
] as const

type AboutSectionProps = {
	data?: unknown
	id?: string
}

export default function AboutSection({ id }: AboutSectionProps) {
	return (
		<section
			aria-labelledby="about-section-title"
			className={styles.root}
			id={id}
		>
			<div className="container">
				<div className={styles.heading}>
					<h2 className={styles.title} id="about-section-title">
						About Me
					</h2>
					<span aria-hidden className={styles.titleBar} />
				</div>

				<div className={styles.bio}>
					<div className={styles.avatarWrap}>
						<img
							alt=""
							className={styles.avatar}
							height={198}
							src="/images/ryan-santos-avatar.png"
							width={198}
						/>
					</div>

					<div className={styles.bioContent}>
						<h3 className={styles.name}>Ryan Santos</h3>
						<p className={styles.bioText}>
							I&apos;m a Frontend Engineer with a passion for building digital
							products that not only look great but also keep real usability at its core. My
							career has mostly been in the digital marketing and e-commerce
							space. I tinker around with projects in my quiet home office in Los
							Angeles, California.
						</p>
						<ul className={styles.socials}>
							{socialLinks.map((link) => {
								const isMail = link.href.startsWith('mailto:')

								return (
									<li key={link.label}>
										<a
											aria-label={link.label}
											className={styles.socialLink}
											href={link.href}
											{...(isMail
												? {}
												: {
														rel: 'noopener noreferrer',
														target: '_blank',
													})}
										>
											<link.icon
												aria-hidden
												className={styles.socialIcon}
												height={24}
												width={24}
											/>
										</a>
									</li>
								)
							})}
						</ul>
					</div>
				</div>

				<ul className={styles.skillGrid}>
					{skills.map((skill) => {
						const Icon = skill.icon
						return (
							<li className={styles.skillCard} key={skill.title}>
								<Icon
									aria-hidden
									className={styles.skillIcon}
									height={30}
									width={29}
								/>
								<div aria-hidden className={styles.skillDivider} />
								<div className={styles.skillText}>
									<p
										className={clsx(
											styles.skillTitle,
											skill.uppercase && styles.upper,
										)}
									>
										{skill.title}
									</p>
									<p className={styles.skillDescription}>
										{skill.description}
									</p>
								</div>
							</li>
						)
					})}
				</ul>

				<ul className={styles.experienceGrid}>
					{experienceColumns.map((column) => (
						<li className={styles.experienceCard} key={column.title}>
							<div aria-hidden className={styles.experienceDivider} />
							<div className={styles.experienceContent}>
								<h3 className={styles.experienceTitle}>{column.title}</h3>
								<ul className={styles.experienceList}>
									{column.items.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
