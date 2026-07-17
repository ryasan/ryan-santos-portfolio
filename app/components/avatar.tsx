import clsx from 'clsx'

const ns = 'avatar'

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
		<div className={clsx(ns, size, className)}>
			{src ? (
				<img alt={alt} className={`${ns}__image`} src={src} />
			) : (
				<img
					alt="Default avatar picture"
					className={`${ns}__placeholder`}
					src="/images/github-avatar.png"
				/>
			)}
		</div>
	)
}
