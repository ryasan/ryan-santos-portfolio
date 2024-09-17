import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { usePointerFollower } from '~/context/pointer-follower-context';

const ns = 'pointer-follower';

type PointerFollowerProps = {
	mixBlendModeEnabled?: boolean;
};

export default function PointerFollower({
	mixBlendModeEnabled,
}: PointerFollowerProps) {
	const rootClassName = clsx({
		[`${ns}`]: true,
		[`mix-blend-mode`]: mixBlendModeEnabled,
	});

	const pointerFollowerRef = useRef<HTMLDivElement>(null);
	const { initFollower, xFollower, yFollower, innerText, followerSize } =
		usePointerFollower();

	useEffect(() => {
		if (pointerFollowerRef.current) {
			initFollower(pointerFollowerRef.current);
		}
	}, [initFollower]);

	useEffect(() => {
		const main = document.querySelector('main');
		const lastChild = main?.lastElementChild;

		// Teleport it to the end of main if it's not already there
		if (lastChild !== pointerFollowerRef.current) {
			main?.appendChild(pointerFollowerRef.current!);
		}
	}, []);

	const width = followerSize === 'sm' ? 10 : 100;

	return (
		<motion.div
			className={rootClassName}
			ref={pointerFollowerRef}
			animate={{ width: width, height: width }}
			style={{
				x: xFollower,
				y: yFollower,
			}}
		>
			<motion.span
				animate={{
					scale: followerSize === 'sm' ? 0 : 1,
					opacity: followerSize === 'sm' ? 0 : 1,
				}}
			>
				{innerText}
			</motion.span>
		</motion.div>
	);
}
