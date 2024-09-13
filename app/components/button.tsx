import clsx from 'clsx';

const ns = 'button';

export default function Button() {
	const rootClassName = clsx({
		[`${ns}`]: true,
	});

	return <button className={rootClassName}>Button</button>;
}
