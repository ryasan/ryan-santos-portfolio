function ArrowRightIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			width="100%"
			height="100%"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M3.125 10H16.875"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
			<path
				d="M11.25 4.375L16.875 10L11.25 15.625"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	);
}

function ChevronDownIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
		>
			<path fill="none" d="M0 0h24v24H0z" />
			<path d="M12 15l-6-6h12z" fill="currentColor" />
		</svg>
	);
}

export type IconName = 'arrow-right' | 'chevron-down';

type IconProps = {
	className?: string;
	name: IconName;
};

export default function Icon({ name, ...props }: IconProps) {
	switch (name) {
		case 'arrow-right':
			return <ArrowRightIcon {...props} />;
		case 'chevron-down':
			return <ChevronDownIcon {...props} />;
		default:
			throw new Error(`Unknown icon name: ${name}`);
	}
}
