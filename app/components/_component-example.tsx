import clsx from 'clsx'

const ns = 'component-example'

function ComponentExample() {
	const rootClassName = clsx(ns)

	return (
		<div className={rootClassName}>
			<h1 className={`${ns}__title`}>ComponentExample</h1>
		</div>
	)
}

export default ComponentExample
