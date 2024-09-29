import clsx from 'clsx'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Button from '~/components/button'
import SectionLayout from '~/components/section-layout'
import { usePointerFollower } from '~/providers/pointer-follower'
import { type Project } from '~/types'

const ns = 'projects-section'

type ProjectCardProps = {
	project: Project
	onMouseEnter(e: React.MouseEvent): void
	onMouseLeave(e: React.MouseEvent): void
}

function ProjectCard({
	project,
	onMouseEnter,
	onMouseLeave,
}: ProjectCardProps) {
	const projectCardRef = useRef(null)
	const isInView = useInView(projectCardRef, { once: true, amount: 0.4 })

	return (
		// eslint-disable-next-line
		<a
			className={`${ns}__project`}
			ref={projectCardRef}
			style={{
				opacity: isInView ? 1 : 0,
				transform: isInView ? 'translateY(0)' : 'translateY(100px)',
			}}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<div className={`${ns}__project-image`}>
				<img src={project.image} alt={project.imageAlt || project.title} />
			</div>
			<div className={`${ns}__project-content`}>
				<small>
					<strong>{project.title}</strong> - {project.caption}
				</small>
			</div>
		</a>
	)
}

type ProjectsSectionProps = {
	projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
	const rootClassName = clsx({
		[`${ns}`]: true,
	})

	const leftProjects = projects.filter((_, i) => i % 2 === 0)
	const rightProjects = projects.filter((_, i) => i % 2 !== 0)

	const { setFollowerText, setMixBlendMode } = usePointerFollower()

	function handleMouseEnter() {
		setFollowerText('Explore')
		setMixBlendMode(false)
	}

	function handleMouseLeave() {
		setFollowerText('')
	}

	return (
		<SectionLayout className={rootClassName} as="section" cursorColor="inverse">
			<div className={`${ns}__inner`}>
				<div className="container">
					<div className={`${ns}__content`}>
						<h2 className={`${ns}__title h1`}>
							<span>Featured</span>
							<span>
								<i>projects</i>
							</span>
						</h2>

						<div
							className={`${ns}__projects`}
							onMouseEnter={() => setMixBlendMode(false)}
						>
							<div className={`${ns}__projects-left`}>
								{leftProjects.map((project, index) => (
									<ProjectCard
										key={index}
										project={project}
										onMouseEnter={handleMouseEnter}
										onMouseLeave={handleMouseLeave}
									/>
								))}
							</div>

							<div className={`${ns}__projects-right`}>
								{rightProjects.map((project, index) => (
									<ProjectCard
										key={index}
										project={project}
										onMouseEnter={handleMouseEnter}
										onMouseLeave={handleMouseLeave}
									/>
								))}
							</div>
						</div>

						<div className={`${ns}__cta`} data-scroll data-scroll-speed="3">
							<Button as="a" href="/projects" variant="outline-white">
								View Projects
							</Button>
						</div>
					</div>
				</div>
			</div>
		</SectionLayout>
	)
}
