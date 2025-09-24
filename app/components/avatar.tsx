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
				<Image src={src} alt={alt} />
			) : (
				<Image
					src="/images/github-avatar.png"
					alt="Avatar Placeholder"
					className={styles.avatarPlaceholder}
				/>
			)}
		</div>
	)
}

export default Avatar
