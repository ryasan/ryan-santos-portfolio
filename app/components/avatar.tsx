import Image from '~/components/image'
import styles from '~/styles/components/avatar.module.scss'

type AvatarProps = {
	src?: string
	alt?: string
}

function Avatar({ src, alt = 'Avatar' }: AvatarProps) {
	return (
		<div className={styles.avatar}>
			{src ? (
				<img src={src} alt={alt} />
			) : (
				<img
					className={styles.avatarPlaceholder}
					src="/images/github-avatar.png"
					alt="Avatar Placeholder"
				/>
			)}
		</div>
	)
}

export default Avatar
