import LocomotiveScroll from 'locomotive-scroll'
import { noop, wait } from '~/utils'

const scrollContainer = document.querySelector(
	'#scroll-container',
) as HTMLElement

if (!scrollContainer) {
	throw new Error('Scroll container not found')
}

wait(1000)
	.then(() => {
		new LocomotiveScroll({
			el: scrollContainer,
			smooth: true,
			direction: 'vertical',
			tablet: {
				breakpoint: 0,
			},
		})
	})
	.catch(noop)
	.finally(noop)
