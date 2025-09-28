import clsx from 'clsx'
import styles from '~/styles/components/footer.module.scss'

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={clsx('container', styles.container)}>
				<p className="body-2">Copyright © {new Date().getFullYear()} Ryan Santos</p>
			</div>
		</footer>
	)
}
