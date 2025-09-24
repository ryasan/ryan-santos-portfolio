import clsx from 'clsx'
import styles from '~/styles/components/rich-text.module.scss'

type RichTextProps = {
	data: any
	className?: string
}

function RichText({ data, className }: RichTextProps) {
	return <div className={clsx(styles.richText, className)}>{data}</div>
}

export default RichText
