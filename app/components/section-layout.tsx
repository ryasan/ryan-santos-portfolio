import { forwardRef } from 'react';
import clsx from 'clsx';

const ns = 'section-layout';

type Props = {
	as?: 'div' | 'section' | 'header' | 'footer';
	children: React.ReactNode;
	className?: string;
	ref?: React.RefObject<HTMLDivElement>;
	disableSmoothScroll?: boolean;
};
type DivProps = React.HTMLAttributes<HTMLDivElement> & Props;

type SectionProps = React.HTMLAttributes<HTMLElement> & Props;

type SectionLayoutProps = DivProps | SectionProps;

const SectionLayout = forwardRef<HTMLDivElement, SectionLayoutProps>(
	(
		{
			as = 'section',
			children,
			className,
			disableSmoothScroll = false,
			...props
		},
		ref,
	) => {
		const rootClassName = clsx({
			[`${ns}`]: true,
			[`${className}`]: className,
		});

		const Component = as;

		return (
			<Component
				className={rootClassName}
				data-scroll-section={!disableSmoothScroll}
				ref={ref}
				{...props}
			>
				{children}
			</Component>
		);
	},
);

SectionLayout.displayName = 'SectionLayout';

export default SectionLayout;
