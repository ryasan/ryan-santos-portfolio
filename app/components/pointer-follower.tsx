import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useFollowPointer } from '~/hooks/use-follow-pointer';
import ClientOnly from '~/components/client-only';

const ns = 'pointer-follower';

function MotionDiv({ mixBlendModeEnabled }: { mixBlendModeEnabled?: boolean }) {
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

type PointerFollowerProps = {
	mixBlendModeEnabled?: boolean;
};

export default function PointerFollower({
	mixBlendModeEnabled,
}: PointerFollowerProps) {
	return (
		<ClientOnly>
			<MotionDiv mixBlendModeEnabled={mixBlendModeEnabled} />
		</ClientOnly>
	);
}
