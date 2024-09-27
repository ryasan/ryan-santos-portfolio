import clsx from 'clsx'
import { forwardRef } from 'react'
import { usePointerFollower } from '~/context/pointer-follower-context'

const ns = 'section-layout'

type Props = {
	as?: 'div' | 'section' | 'header' | 'footer'
	children: React.ReactNode
	className?: string
	ref?: React.RefObject<HTMLDivElement>
	disableSmoothScroll?: boolean
	cursorColor?: 'auto' | 'inverse'
}
type DivProps = React.HTMLAttributes<HTMLDivElement> & Props

type SectionProps = React.HTMLAttributes<HTMLElement> & Props

type SectionLayoutProps = DivProps | SectionProps

const SectionLayout = forwardRef<HTMLDivElement, SectionLayoutProps>(
	(
		{
			as = 'section',
			children,
			className,
			disableSmoothScroll = false,
			cursorColor = 'auto',
			...props
		},
		ref,
	) => {
		const rootClassName = clsx({
			[`${ns}`]: true,
			[`${className}`]: className,
		})

		const { setMixBlendMode } = usePointerFollower()

		function handleMouseEnter() {
			setMixBlendMode(cursorColor === 'inverse')
		}

		function handleMouseLeave() {
			setMixBlendMode(false)
		}

		const Component = as

		return (
			<Component
				className={rootClassName}
				ref={ref}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...(!disableSmoothScroll && { 'data-scroll-section': 'true' })}
				{...props}
			>
				{children}
			</Component>
		)
	},
)

SectionLayout.displayName = 'SectionLayout'

export default SectionLayout
