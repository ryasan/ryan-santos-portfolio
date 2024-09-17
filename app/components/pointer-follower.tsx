import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useFollowPointer } from '~/hooks/use-follow-pointer';

const ns = 'pointer-follower';

type PointerFollowerProps = {
	mixBlendModeEnabled?: boolean;
};

export default function PointerFollower({
	mixBlendModeEnabled,
}: PointerFollowerProps) {
	const rootClassName = clsx({
		[`${ns}`]: true,
		[`${ns}--mix-blend-mode`]: mixBlendModeEnabled,
	});

	const pointerFollowerRef = useRef<HTMLDivElement>(null);
	const { x, y } = useFollowPointer(pointerFollowerRef);

	useEffect(() => {
		const main = document.querySelector('main');
		const lastChild = main?.lastElementChild;

		// Teleport it to the end of main if it's not already there
		if (lastChild !== pointerFollowerRef.current) {
			main?.appendChild(pointerFollowerRef.current!);
		}
	}, []);

	return (
		<motion.div
			className={rootClassName}
			ref={pointerFollowerRef}
			style={{ x, y }}
		/>
	);
}
