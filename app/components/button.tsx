import clsx from 'clsx';

const ns = 'button';

type ButtonProps = {
	as?: 'button' | 'a';
	children: React.ReactNode;
	className?: string;
	mailto?: string;
	href?: string;
	onClick?: () => void;
};

export default function Button({
	children,
	as = 'button',
	className,
	mailto,
	href,
	onClick,
}: ButtonProps) {
	const rootClassName = clsx({
		[`${ns}`]: true,
		[`${className}`]: className,
	});

	const isDownload = href?.startsWith('.');
	const isExternal = href?.startsWith('http');

	if (isDownload) {
		return (
			<a className={rootClassName} href={href} download>
				{children}
			</a>
		);
	}

	if (mailto) {
		return (
			<a
				className={rootClassName}
				href={`mailto:${mailto}`}
				target="_blank"
				rel="noopener noreferrer"
			>
				{children}
			</a>
		);
	}

	if (as === 'a') {
		return (
			<a
				className={rootClassName}
				href={href}
				onClick={onClick}
				target={isExternal ? '_blank' : undefined}
				rel="noopener noreferrer"
			>
				{children}
			</a>
		);
	}

	return (
		<button className={rootClassName} onClick={onClick}>
			{children}
		</button>
	);
}
