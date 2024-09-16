import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import ClientOnly from '~/components/client-only';

const ns = 'sidebar';

type SidebarProps = {
	className?: string;
	isOpen: boolean;
	toggleSidebar: (state: boolean) => void;
};

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
	const rootClassName = clsx({
		[`${ns}`]: true,
	});

	return (
		<div className={rootClassName}>
			<ClientOnly>
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
							className={`${ns}__backdrop`}
							onClick={() => toggleSidebar(false)}
						/>
					)}
				</AnimatePresence>

				<motion.div
					className={`${ns}__panel`}
					initial={{ x: '100%' }}
					animate={{ x: isOpen ? 0 : '100%' }}
					transition={{ duration: 0.5 }}
				>
					<div className={`${ns}__panel`}>Sidebar</div>
				</motion.div>
			</ClientOnly>
		</div>
	);
}
