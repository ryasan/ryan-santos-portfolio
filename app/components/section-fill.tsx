import clsx from 'clsx'
import { motion, useInView } from 'framer-motion'
import React, { useRef } from 'react'

const ns = 'section-fill'

function SectionFill() {
	const rootClassName = clsx({
		[`${ns}`]: true,
	})

	const rootRef = useRef<HTMLDivElement>(null)
	const isInView = useInView(rootRef, { amount: 0.2 })

	React.useEffect(() => {
		if (isInView) {
			console.log('in view')
		}
	}, [isInView])

	return (
		<motion.div
			className={rootClassName}
			ref={rootRef}
			animate={{
				width: isInView ? '200vw' : '0%',
				height: isInView ? '200vw' : '0%',
			}}
			style={{
				borderRadius: '50%',
				left: '50%',
				top: '50%',
				position: 'absolute',
				transform: 'translate(-50%, -50%)',
				transformOrigin: 'center',
				transition: 'all 1.5s',
			}}
		/>
	)
}

export default SectionFill
