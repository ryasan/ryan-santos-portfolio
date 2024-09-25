import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { usePointerFollower } from '~/context';
import { wait } from '~/utils';

const ns = 'pointer-follower';

export default function PointerFollower() {
	const [isReady, setIsReady] = useState(false);
	const pointerFollowerRef = useRef<HTMLDivElement>(null);

	const {
		setFollower,
		xFollower,
		yFollower,
		innerText,
		followerIsOutOfBounds,
		followerSize,
		mixBlendModeEnabled,
	} = usePointerFollower();

	useEffect(() => {
		if (pointerFollowerRef.current) {
			setFollower(pointerFollowerRef.current);
		}
	}, [setFollower]);

	useEffect(() => {
		wait(2500).then(() => {
			setIsReady(true);
		});
	}, []);

	const rootClassName = clsx({
		[`${ns}`]: true,
		[`${ns}--mix-blend-mode`]: mixBlendModeEnabled,
	});

	return (
		<motion.div
			className={rootClassName}
			ref={pointerFollowerRef}
			animate={{
				width: followerSize,
				height: followerSize,
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
					scale: followerSize === 10 ? 0 : 1,
					opacity: followerSize === 10 ? 0 : 1,
				}}
			>
				{innerText}
			</motion.span>
		</motion.div>
	);
}
