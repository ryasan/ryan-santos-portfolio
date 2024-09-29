import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { usePointerFollower } from '~/providers/pointer-follower'
import { noop, wait } from '~/utils'

const ns = 'pointer-follower'

export default function PointerFollower() {
	const [isReady, setIsReady] = useState(false)
	const pointerFollowerRef = useRef<HTMLDivElement>(null)

	const {
		followerSize,
		innerText,
		isMixBlendMode,
		isOutOfBounds,
		setFollower,
		xFollower,
		yFollower,
	} = usePointerFollower()

	useEffect(() => {
		wait(2000)
			.then(() => setIsReady(true))
			.catch(noop)
	}, [])

	useEffect(() => {
		if (pointerFollowerRef.current) {
			document.body.prepend(pointerFollowerRef.current)
			setFollower(pointerFollowerRef.current)
		}
	}, [setFollower])

	const rootClassName = clsx({
		[`${ns}`]: true,
		[`${ns}--mix-blend-mode`]: isMixBlendMode,
	})

	return (
		<motion.div
			className={rootClassName}
			ref={pointerFollowerRef}
			animate={{
				width: followerSize,
				height: followerSize,
				opacity: isReady ? 1 : 0,
				scale: isOutOfBounds ? 0 : 1,
			}}
			style={{
				x: xFollower,
				y: yFollower,
			}}
		>
			<motion.span
				animate={{
					scale: innerText === '' ? 0 : 1,
					opacity: innerText === '' ? 0 : 1,
				}}
			>
				{innerText}
			</motion.span>
		</motion.div>
	)
}
