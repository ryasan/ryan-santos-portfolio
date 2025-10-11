import styles from '~/styles/components/avatar.module.scss'

type AvatarProps = {
	src?: string
	alt?: string
}

export default function Avatar({ src, alt = 'Avatar' }: AvatarProps) {
	return (
		<div className={styles.avatar}>
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
