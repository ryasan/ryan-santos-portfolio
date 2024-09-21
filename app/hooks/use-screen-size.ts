import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

const sizes = {
	tablet: 768,
	laptop: 992,
	desktop: 1200,
	widescreen: 1400,
};

const getMedia = () => ({
	isMobile: window.matchMedia(`(max-width: ${sizes.tablet - 1}px)`).matches,
	isDesktop: window.matchMedia(`(min-width: ${sizes.laptop}px)`).matches,
});

export function useScreenSize() {
	const [screenSize, setScreenSize] = useState(getMedia());

	useEffect(() => {
		const handleResize = debounce(() => {
			setScreenSize(getMedia());
		}, 100);

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return screenSize;
}
