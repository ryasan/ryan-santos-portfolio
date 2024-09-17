import { useState, useEffect } from 'react';

export function useIsBeingHovered(el: HTMLElement) {
	const [isBeingHovered, setIsBeingHovered] = useState(false);

	useEffect(() => {
		if (!el) return;

		const handleMouseEnter = () => setIsBeingHovered(true);
		const handleMouseLeave = () => setIsBeingHovered(false);

		el.addEventListener('mouseenter', handleMouseEnter);
		el.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			el.removeEventListener('mouseenter', handleMouseEnter);
			el.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, [el]);

	return isBeingHovered;
}
