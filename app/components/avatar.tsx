import clsx from 'clsx'
import styles from '~/styles/components/avatar.module.scss'

type AvatarProps = {
	src?: string
	alt?: string
	className?: string
	size?: 'small' | 'medium'
}

export default function Avatar({
	src,
	className,
	alt = 'Avatar',
	size = 'medium',
}: AvatarProps) {
	return (
		<div className={clsx(styles.avatar, styles[size], className)}>
			{src ? (
				<img className={styles.avatarImage} src={src} alt={alt} />
			) : (
				<img
					className={styles.avatarPlaceholder}
					src="/images/github-avatar.png"
					alt="Default avatar picture"
				/>
			)}
		</div>
	)
}
