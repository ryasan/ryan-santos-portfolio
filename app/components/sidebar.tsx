import clsx from 'clsx';
import { motion, useTransform } from 'framer-motion';

const ns = 'sidebar';

type SidebarProps = {
	className?: string;
	isOpen: boolean;
};

export default function Sidebar() {
	const rootClassName = clsx({
		[`${ns}`]: true,
	});

	return (
		<div className={rootClassName}>
			<div className={`${ns}__backdrop`} />
			<div className={`${ns}__panel`}>
				Sidebar
			</div>
		</div>
	);
}
