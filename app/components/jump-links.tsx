import Link from '~/components/link'
import clsx from 'clsx'
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
	const globalFooter = { id: 'global-footer', link: '#global-footer' }

	return (
		<div className={styles.jumpLinks}>
			{[...sections, globalFooter].map((section, index) => {
				const id = 'sys' in section ? section.sys.id : section.id
				if (!id) return null
				const isActive = hashWithoutHash === id

				return (
					<Link
						className={clsx(styles.link, isActive && styles.active)}
						key={id}
						to={`#${id}`}
					>{`${index < 10 ? '0' : ''}${index + 1}`}</Link>
				)
			})}
		</div>
	)
}
