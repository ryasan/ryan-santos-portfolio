/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';

const ns = 'button';

const transformVariants: Variants = {
	hidden: {
		y: '-100%',
	},
	visible: {
		y: '0%',
	},
};

const eclipseVariants: Variants = {
	hidden: {
		borderRadius: '50% 50% 0 0',
		y: '100%',
	},
	visible: {
		borderRadius: '0%',
		y: '0',
	},
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	as?: 'button' | 'a';
	children: React.ReactNode;
	className?: string;
	mailto?: string;
	href?: string;
	onClick?(): void;
};

export default function Button({
	children,
	as = 'button',
	className,
	mailto,
	href,
	onClick,
	onMouseEnter,
	onMouseLeave,
}: ButtonProps) {
	const rootClassName = clsx({
		[`${ns}`]: true,
		[`${className}`]: className,
	});

	const [isHovered, setIsHovered] = useState(false);
	const isDownload = href?.startsWith('.');
	const isExternal = href?.startsWith('http');
	const component = as;

	function handleMouseEnter(e: any) {
		if (onMouseEnter) {
			onMouseEnter(e);
			setIsHovered(true);
		}
	}

	function handleMouseLeave(e: any) {
		if (onMouseLeave) {
			onMouseLeave(e);
			setIsHovered(false);
		}
	}

	const props = {
		...(as === 'a' && {
			href,
			onClick,
			target: isExternal ? '_blank' : undefined,
			rel: 'noopener noreferrer',
		}),
		...(isDownload && {
			href,
			download: true,
		}),
		...(mailto && {
			href: `mailto:${mailto}`,
			target: '_blank',
			rel: 'noopener noreferrer',
		}),
		...(as === 'button' && {
			onClick,
		}),
	};

	const MotionComponent = motion[component];

	return (
		<MotionComponent
			className={rootClassName}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			whileHover={{ scaleX: 1.02 }}
			transition={{
				duration: 0.6,
				ease: [0.34, 5.56, 0.64, 1],
			}}
			{...props}
		>
			<div className={`${ns}__content`}>
				<motion.span
					className={`${ns}__text`}
					animate={isHovered ? 'hidden' : 'visible'}
					variants={transformVariants}
				>
					{children}
				</motion.span>
			</div>
			<motion.span
				className={`${ns}__eclipse`}
				animate={isHovered ? 'visible' : 'hidden'}
				variants={eclipseVariants}
				initial={false}
				transition={{ ease: 'linear' }}
			>
				{children}
			</motion.span>
		</MotionComponent>
	);
}
