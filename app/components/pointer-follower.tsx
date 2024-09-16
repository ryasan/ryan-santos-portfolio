import { useRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useFollowPointer } from '~/hooks/use-follow-pointer';

const ns = 'pointer-follower';

type PointerFollowerProps = {
	mixBlendModeEnabled?: boolean;
};

const PointerFollower = ({ mixBlendModeEnabled }: PointerFollowerProps) => {
	const rootClassName = clsx({
		[`${ns}`]: true,
		[`${ns}--mix-blend-mode`]: mixBlendModeEnabled,
	});

	const pointerFollowerRef = useRef<HTMLDivElement>(null);
	const { x, y } = useFollowPointer(pointerFollowerRef);

	return (
		<motion.div
			className={rootClassName}
			ref={pointerFollowerRef}
			style={{ x, y }}
		/>
	);
};

export default PointerFollower;
