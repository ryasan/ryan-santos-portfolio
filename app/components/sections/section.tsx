import clsx from 'clsx'
import styles from '~/styles/components/sections/section.module.scss'

const paddingClasses = {
	none: '',
	small: 'padding-sm',
	medium: 'padding-md',
	large: 'padding-lg',
} as const

type SectionProps = {
	children: React.ReactNode
	className?: string
	id?: string
	paddingSize: 'none' | 'small' | 'medium' | 'large'
}

export default function Section({
	children,
	className,
	id,
	paddingSize,
}: SectionProps) {
	return (
		<section
			className={clsx(styles.section, paddingClasses[paddingSize], className)}
			id={id}
		>
			{children}
		</section>
	)
}
