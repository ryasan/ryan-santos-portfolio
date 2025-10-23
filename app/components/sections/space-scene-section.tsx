import * as THREE from 'three'
import clsx from 'clsx'
import styles from '~/styles/components/sections/space-scene-section.module.scss'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { degreesToRadians, progress, mix } from 'popmotion'
import { useRef, useLayoutEffect } from 'react'
import { useTheme } from '~/hooks/use-theme'
import { useTransform, useScroll, useTime } from 'framer-motion'

const Icosahedron = () => {
	const theme = useTheme()
	const color = theme === 'light' ? '#111316' : '#ffffff'

	return (
		<mesh rotation-x={0.35}>
			<icosahedronGeometry args={[1, 0]} />
			<meshBasicMaterial wireframe color={color} />
		</mesh>
	)
}

const Star = ({ p }: { p: number }) => {
	const ref = useRef<THREE.Mesh>(null)
	const theme = useTheme()
	const color = theme === 'light' ? '#111316' : '#ffffff'

	useLayoutEffect(() => {
		const distance = mix(2, 3.5, Math.random())
		const yAngle = mix(
			degreesToRadians(80),
			degreesToRadians(100),
			Math.random(),
		)
		const xAngle = degreesToRadians(360) * p
		ref.current!.position.setFromSphericalCoords(distance, yAngle, xAngle)
	})

	return (
		<mesh ref={ref}>
			<boxGeometry args={[0.05, 0.05, 0.05]} />
			<meshBasicMaterial wireframe color={color} />
		</mesh>
	)
}

function Scene({ numStars = 100 }) {
	const gl = useThree((state) => state.gl)
	const { scrollYProgress } = useScroll()
	const yAngle = useTransform(
		scrollYProgress,
		[0, 1],
		[0.001, degreesToRadians(180)],
	)
	const distance = useTransform(scrollYProgress, [0, 1], [10, 3])
	const time = useTime()

	useFrame(({ camera }) => {
		camera.position.setFromSphericalCoords(
			distance.get(),
			yAngle.get(),
			time.get() * 0.0005,
		)
		camera.updateProjectionMatrix()
		camera.lookAt(0, 0, 0)
	})

	useLayoutEffect(() => gl.setPixelRatio(0.3))

	const stars = []
	for (let i = 0; i < numStars; i++) {
		stars.push(<Star p={progress(0, numStars, i)} />)
	}

	return (
		<>
			<Icosahedron />
			{stars}
		</>
	)
}

export default function SpaceSceneSection() {
	return (
		<section className={styles.spaceSceneSection}>
			<div className={clsx(styles.container, 'container')}>
				<Canvas className={styles.canvas} gl={{ antialias: false }}>
					<Scene />
				</Canvas>
			</div>
		</section>
	)
}
