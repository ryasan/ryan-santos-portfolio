import Link from '~/components/link'
import clsx from 'clsx';
import styles from '~/styles/components/jump-links.module.scss'
import { PagePageSectionsItem } from '~/graphql/__generated/sdk'
import { useLocation } from '@remix-run/react'

type JumpLinksProps = {
	sections: PagePageSectionsItem[]
}

export default function JumpLinks({ sections }: JumpLinksProps) {
	const location = useLocation()
	const hash = location.hash
	const hashWithoutHash = hash.slice(1)

	return (
		<div className={styles.jumpLinks}>
			{sections.map((section, index) => {
				if (!section?.sys?.id) return null
				const isActive = hashWithoutHash === section.sys.id

				return (
					<Link
						className={clsx(styles.link, isActive && styles.active)}
						key={section.sys.id}
						to={`#${section.sys.id}`}
					>{`${index < 10 ? '0' : ''}${index + 1}`}</Link>
				)
			})}
		</div>
	)
}
