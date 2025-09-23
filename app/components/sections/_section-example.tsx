import clsx from 'clsx'

const ns = 'section-example'

function SectionExample() {
	const rootClassName = clsx(ns)

	return (
		<div className={rootClassName}>
			<h1 className={`${ns}__title`}>SectionExample</h1>
		</div>
	)
}

export default SectionExample
