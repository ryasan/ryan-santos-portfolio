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

const ns = 'about-section'

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
		<section aria-labelledby={`${ns}-title`} className={ns} id={id}>
			<div className="container">
				<div className={`${ns}__heading`}>
					<h2 className={`${ns}__title`} id={`${ns}-title`}>
						About Me
					</h2>
					<span aria-hidden className={`${ns}__title-bar`} />
				</div>

				<div className={`${ns}__bio`}>
					<div className={`${ns}__avatar-wrap`}>
						<img
							alt=""
							className={`${ns}__avatar`}
							height={198}
							src="/images/ryan-santos-avatar.png"
							width={198}
						/>
					</div>

					<div className={`${ns}__bio-content`}>
						<h3 className={`${ns}__name`}>Ryan Santos</h3>
						<p className={`${ns}__bio-text`}>
							I&apos;m a Frontend Engineer specializing in building performant
							digital products with human-centered usability at their core. My
							dev career has mostly been rooted in digital marketing and
							e-commerce. I code up projects in my quiet home office in Los
							Angeles, California.
						</p>
						<ul className={`${ns}__socials`}>
							{socialLinks.map((link) => {
								const isMail = link.href.startsWith('mailto:')

								return (
									<li key={link.label}>
										<a
											aria-label={link.label}
											className={`${ns}__social-link`}
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
												className={`${ns}__social-icon`}
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

				<ul className={`${ns}__skill-grid`}>
					{skills.map((skill) => {
						const Icon = skill.icon
						return (
							<li className={`${ns}__skill-card`} key={skill.title}>
								<Icon
									aria-hidden
									className={`${ns}__skill-icon`}
									height={30}
									width={29}
								/>
								<div aria-hidden className={`${ns}__skill-divider`} />
								<div className={`${ns}__skill-text`}>
									<p
										className={clsx(
											`${ns}__skill-title`,
											skill.uppercase && `${ns}__skill-title--upper`,
										)}
									>
										{skill.title}
									</p>
									<p className={`${ns}__skill-description`}>
										{skill.description}
									</p>
								</div>
							</li>
						)
					})}
				</ul>

				<ul className={`${ns}__experience-grid`}>
					{experienceColumns.map((column) => (
						<li className={`${ns}__experience-card`} key={column.title}>
							<div aria-hidden className={`${ns}__experience-divider`} />
							<div className={`${ns}__experience-content`}>
								<h3 className={`${ns}__experience-title`}>{column.title}</h3>
								<ul className={`${ns}__experience-list`}>
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
