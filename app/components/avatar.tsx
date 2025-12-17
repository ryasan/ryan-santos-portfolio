import clsx from 'clsx'
import styles from '~/styles/components/avatar.module.scss'

type AvatarProps = {
	alt?: string
	className?: string
	size?: 'small' | 'medium'
	src?: string | null
}

export default function Avatar({
	alt = 'Avatar',
	className,
	size = 'medium',
	src,
}: AvatarProps) {
	return (
		<div className={clsx(styles.avatar, styles[size], className)}>
			{src ? (
				<img alt={alt} className={styles.avatarImage} src={src} />
			) : (
				<img
					alt="Default avatar picture"
					className={styles.avatarPlaceholder}
					src="/images/github-avatar.png"
				/>
			)}
		</div>
	)
}
