import LocomotiveScroll from 'locomotive-scroll'
import { wait } from '~/utils'

// const scrollContainer = document.querySelector(
// 	'#scroll-container',
// ) as HTMLElement

// if (!scrollContainer) {
// 	throw new Error('Scroll container not found')
// }

// wait(1000)
// 	.then(() => {
// 		new LocomotiveScroll({
// 			el: scrollContainer,
// 			smooth: true,
// 			direction: 'vertical',
// 			tablet: {
// 				breakpoint: 0,
// 			},
// 		})
// 	})
// 	.catch((error) => {
// 		console.error(error)
// 	})
// 	.finally(() => {
// 		console.log('Locomotive Scroll initialized')
// 	})

let scrollInstance: LocomotiveScroll | null = null

function initLocomotiveScroll() {
	const scrollContainer = document.querySelector(
		'#scroll-container',
	) as HTMLElement

	if (!scrollContainer) {
		throw new Error('Scroll container not found')
	}

	try {
		scrollInstance = new LocomotiveScroll({
			el: scrollContainer,
			smooth: true,
			direction: 'vertical',
			tablet: {
				breakpoint: 0,
			},
		})

		console.log('Locomotive Scroll initialized successfully')
		return scrollInstance
	} catch (error) {
		console.error('Failed to initialize Locomotive Scroll:', error)
		scrollInstance = null
	}
}

function destroyLocomotiveScroll() {
	if (scrollInstance) {
		try {
			scrollInstance.destroy()
			scrollInstance = null
			console.log('Locomotive Scroll destroyed successfully')
		} catch (error) {
			console.error('Error destroying Locomotive Scroll:', error)
		}
	}
}

function waitForDOMReady(delay: number = 100): Promise<void> {
	return new Promise((resolve) => {
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', () => resolve())
		} else {
			resolve()
		}
	})
}

// Initialize when DOM is ready
waitForDOMReady()
  .then(() => {
    // Small delay to ensure all content is rendered
    return new Promise(resolve => setTimeout(resolve, 100))
  })
  .then(initLocomotiveScroll)
  .catch(error => {
    console.error('Error during scroll initialization:', error)
  })


export { initLocomotiveScroll, destroyLocomotiveScroll }
