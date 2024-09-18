import { useRef } from 'react';
import { useInView } from 'framer-motion';
import clsx from 'clsx';
import { usePointerFollower } from '~/context/pointer-follower-context';
import type { Project } from '~/types';

const ns = 'works-section';

type WorksSectionProps = {
	projects: Project[];
};

function ProductCard({
	project,
	onMouseEnter,
	onMouseLeave,
}: {
	project: Project;
	onMouseEnter(): void;
	onMouseLeave(): void;
}) {
	const productCardRef = useRef(null);
	const isInView = useInView(productCardRef, { once: true, amount: 0.4 });

	return (
		// eslint-disable-next-line jsx-a11y/anchor-is-valid
		<a
			className={`${ns}__project`}
			ref={productCardRef}
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

export default function WorksSection({ projects }: WorksSectionProps) {
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
								<ProductCard
									key={index}
									project={project}
									onMouseEnter={handleMouseEnter}
									onMouseLeave={handleMouseLeave}
								/>
							))}
						</div>

						<div className={`${ns}__projects-right`}>
							{rightProjects.map((project, index) => (
								<ProductCard
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
	);
}
