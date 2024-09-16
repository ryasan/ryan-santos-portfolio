import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ns = 'motion';

type MotionProps = {
	children: React.ReactNode;
};

export default function Motion({ children }: MotionProps) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [_motion, setMotion] = useState<any>(null);

	useEffect(() => {
		import('framer-motion').then((mod) => setMotion(mod));
	}, []);
	
	if (!_motion) return null;

	const { motion: Motion } = _motion;
}
