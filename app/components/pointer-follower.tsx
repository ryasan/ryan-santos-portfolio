import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { usePointerFollower } from '~/context/pointer-follower-context';
import { wait } from '~/utils';

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

	const [isReady, setIsReady] = useState(false);
	const pointerFollowerRef = useRef<HTMLDivElement>(null);
	const {
		initFollower,
		xFollower,
		yFollower,
		innerText,
		followerIsOutOfBounds,
		followerSize,
	} = usePointerFollower();

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

	useEffect(() => {
		wait(2500).then(() => {
			setIsReady(true);
		});
	}, []);

	const width = followerSize === 'sm' ? 10 : 100;

	return (
		<motion.div
			className={rootClassName}
			ref={pointerFollowerRef}
			animate={{
				width: width,
				height: width,
				scale: followerIsOutOfBounds ? 0 : 1,
			}}
			style={{
				x: xFollower,
				y: yFollower,
				opacity: isReady ? 1 : 0,
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
