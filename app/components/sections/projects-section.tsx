import { useRef } from 'react';
import { useInView } from 'framer-motion';
import clsx from 'clsx';
import { usePointerFollower } from '~/context/pointer-follower-context';
import type { Project } from '~/types';

const ns = 'projects-section';

type ProjectsSectionProps = {
	projects: Project[];
};

function ProjectCard({
	project,
	onMouseEnter,
	onMouseLeave,
}: {
	project: Project;
	onMouseEnter(): void;
	onMouseLeave(): void;
}) {
	const projectCardRef = useRef(null);
	const isInView = useInView(projectCardRef, { once: true, amount: 0.4 });

	return (
		// eslint-disable-next-line jsx-a11y/anchor-is-valid
		<a
			className={`${ns}__project`}
			ref={projectCardRef}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			style={{
				opacity: isInView ? 1 : 0,
				transform: isInView ? 'translateY(0)' : 'translateY(100px)',
				transition: 'all 0.5s ease-out',
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
		<div className={rootClassName} data-scroll-section>
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
					</div>
				</div>
			</div>
		</div>
	);
}
