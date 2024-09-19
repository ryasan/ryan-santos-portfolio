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

export type IconName = 'arrow-right';

type IconProps = {
	className?: string;
	name: IconName;
};

export default function Icon({ name, ...props }: IconProps) {
	switch (name) {
		case 'arrow-right':
			return <ArrowRightIcon {...props} />;
		default:
			return null;
	}
}
