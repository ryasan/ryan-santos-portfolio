import { useRef } from 'react';
import { useInView } from 'framer-motion';
import clsx from 'clsx';
import ParallaxItem from '~/components/parallax-item';
import Button from '~/components/button';
import { usePointerFollower } from '~/context';
import type { Project } from '~/types';

const ns = 'projects-section';

type ProjectCardProps = {
	project: Project;
	onMouseEnter(): void;
	onMouseLeave(): void;
};

function ProjectCard({
	project,
	onMouseEnter,
	onMouseLeave,
}: ProjectCardProps) {
	const projectCardRef = useRef(null);
	const isInView = useInView(projectCardRef, { once: true, amount: 0.4 });

	return (
		// eslint-disable-next-line
		<a
			className={`${ns}__project`}
			ref={projectCardRef}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			style={{
				opacity: isInView ? 1 : 0,
				transform: isInView ? 'translateY(0)' : 'translateY(100px)',
			}}
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
	);
}

type ProjectsSectionProps = {
	projects: Project[];
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
	const rootClassName = clsx({
		[`${ns}`]: true,
	});

	const { setFollowerText } = usePointerFollower();
	const leftProjects = projects.filter((_, i) => i % 2 === 0);
	const rightProjects = projects.filter((_, i) => i % 2 !== 0);

	function handleMouseEnter() {
		setFollowerText('Explore');
	}

	function handleMouseLeave() {
		setFollowerText('');
	}

	return (
		<section className={rootClassName} data-scroll-section>
			<div className={`${ns}__inner`}>
				<div className="container">
					<div className={`${ns}__content`}>
						<h2 className={`${ns}__title h1`}>
							<span>Featured</span>
							<span>
								<i>projects</i>
							</span>
						</h2>

						<div className={`${ns}__projects`}>
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

						<div className={`${ns}__cta`}>
							<Button as="a" href="/projects" icon="arrow-right">
								View Projects
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
