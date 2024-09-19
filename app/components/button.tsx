/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { motion, type Variants } from 'framer-motion';
import Icon, { type IconName } from '~/components/icons';

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
	icon?: IconName;
	onClick?(): void;
	variant?: 'default' | 'black' | 'white' | 'outline-black' | 'outline-white';
};

export default function Button({
	children,
	as = 'button',
	className,
	mailto,
	href,
	icon,
	onClick,
	onMouseEnter = () => {},
	onMouseLeave = () => {},
	variant = 'default',
}: ButtonProps) {
	const rootClassName = clsx({
		[`${ns}`]: true,
		[`${className}`]: className,
		[`${ns}--${variant}`]: variant,
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
			{...props}
		>
			<div className={`${ns}__content`}>
				<motion.span
					className={`${ns}__text`}
					animate={isHovered ? 'hidden' : 'visible'}
					variants={transformVariants}
				>
					{children}
					{icon && <Icon className={`${ns}__icon`} name={icon} />}
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
				{icon && <Icon className={`${ns}__icon`} name={icon} />}
			</motion.span>
		</MotionComponent>
	);
}
