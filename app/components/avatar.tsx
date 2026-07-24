import clsx from 'clsx'
import styles from './avatar.module.css'


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
		<div className={clsx(styles.root, size && styles[size], className)}>
			{src ? (
				<img alt={alt} className={styles.image} src={src} />
			) : (
				<img
					alt="Default avatar picture"
					className={styles.placeholder}
					src="/images/github-avatar.png"
				/>
			)}
		</div>
	)
}
