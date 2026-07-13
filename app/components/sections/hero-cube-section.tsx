import ClientOnly from '~/components/client-only'
import clsx from 'clsx'
import styles from '~/styles/components/sections/hero-cube-section.module.scss'
import type * as THREE from 'three'
import { ArrowRightIcon } from '~/components/icons'
import { BLACK, WHITE } from '~/utils/constants'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
	ContactShadows,
	Edges,
	Float,
	PerspectiveCamera,
	Text,
} from '@react-three/drei'
import { gsap } from 'gsap'
import { type HeroCubeSection as HeroCubeSectionType } from '~/graphql/__generated/sdk'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { useTheme } from '~/hooks/use-theme'

type CubeProps = {
	rotationProgress: React.MutableRefObject<number>
	textItems: HeroCubeSectionType['textItems']
}

const Cube = ({ rotationProgress, textItems }: CubeProps) => {
	const meshRef = useRef<THREE.Mesh>(null)
	const [theme] = useTheme()
	const { viewport } = useThree()

	// Adjust cube size based on viewport width to fit on mobile screens
	const responsiveSize = viewport.width * 0.48
	const cubeSize = Math.min(2.2, responsiveSize)

	const txtOffset = cubeSize / 2 + 0.01 // Slightly offset text to avoid z-fighting
	const contentColor = theme === 'dark' ? WHITE : BLACK
	const backgroundColor = theme === 'dark' ? BLACK : WHITE

	// Scale font size relative to cube size (base ratio approx 0.35/3 ≈ 0.116)
	const fontSize = cubeSize * 0.12
	const fontWeight = 650

	useFrame((state) => {
		if (!meshRef.current) return

		// 1. Scroll Rotation (Y-axis)
		// We want to show 4 sides, so we need to rotate 270 degrees (3 * 90)
		// 0% -> Side 1 (0 deg)
		// 100% -> Side 4 (-270 deg)
		const scrollRotY = rotationProgress.current * -(Math.PI * 1.5)

		// 2. Mouse Follow (Tilt)
		// state.mouse.x/y are normalized coordinates (-1 to 1)
		// x: -1 (left) to 1 (right)
		// y: -1 (bottom) to 1 (top)
		const tiltStrength = 0.15

		// If mouse is at top (y=1), we want to look up (rotate X negative)
		const mouseTiltX = -state.mouse.y * tiltStrength

		// If mouse is at right (x=1), we want to look right (rotate Y negative? or positive?)
		// Standard Y rotation: positive is counter-clockwise (left).
		// So if we want to look right, we rotate Y negative.
		const mouseTiltY = -state.mouse.x * tiltStrength

		// Apply rotations
		// Combine scroll rotation with mouse tilt
		meshRef.current.rotation.y = scrollRotY + mouseTiltY
		meshRef.current.rotation.x = mouseTiltX
		// Slight roll for better feel
		meshRef.current.rotation.z = -state.mouse.x * (tiltStrength * 0.5)
	})

	return (
		<mesh ref={meshRef}>
			<boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
			<meshBasicMaterial color={backgroundColor} toneMapped={false} />

			<Edges color={contentColor} lineWidth={5} />

			{/* Side 1: Front (0 deg) */}
			<Text
				anchorX="center"
				anchorY="middle"
				color={contentColor}
				fontSize={fontSize}
				fontWeight={fontWeight}
				maxWidth={cubeSize - 0.2}
				position={[0, 0, txtOffset]}
				textAlign="center"
			>
				{textItems?.[0]}
			</Text>

			{/* Side 2: Right (-90 deg) */}
			<Text
				anchorX="center"
				anchorY="middle"
				color={contentColor}
				fontSize={fontSize}
				fontWeight={fontWeight}
				maxWidth={cubeSize - 0.2}
				position={[txtOffset, 0, 0]}
				rotation={[0, Math.PI / 2, 0]}
				textAlign="center"
			>
				{textItems?.[1]}
			</Text>

			{/* Side 3: Back (-180 deg) */}
			<Text
				anchorX="center"
				anchorY="middle"
				color={contentColor}
				fontSize={fontSize}
				fontWeight={fontWeight}
				maxWidth={cubeSize - 0.2}
				position={[0, 0, -txtOffset]}
				rotation={[0, Math.PI, 0]}
				textAlign="center"
			>
				{textItems?.[2]}
			</Text>

			{/* Side 4: Left (-270 deg) */}
			<Text
				anchorX="center"
				anchorY="middle"
				color={contentColor}
				fontSize={fontSize}
				fontWeight={fontWeight}
				maxWidth={cubeSize - 0.2}
				position={[-txtOffset, 0, 0]}
				rotation={[0, -Math.PI / 2, 0]}
				textAlign="center"
			>
				{textItems?.[3]}
			</Text>
		</mesh>
	)
}

type HeroCubeSectionProps = {
	data?: HeroCubeSectionType
	id?: string
}

export default function HeroCubeSection({ data, id }: HeroCubeSectionProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const stickyBoxRef = useRef<HTMLDivElement>(null)
	const scrollToExploreRef = useRef<HTMLDivElement>(null)
	// Mutable ref to share scroll progress with the Canvas without re-renders
	const progress = useRef(0)
	const [theme] = useTheme()
	const backgroundColor = theme === 'dark' ? BLACK : WHITE

	useGSAP(
		() => {
			const stickyBox = stickyBoxRef.current
			const scrollToExplore = scrollToExploreRef.current
			const container = containerRef.current

			gsap.to(stickyBox, {
				delay: 0.75,
				duration: 1,
				ease: 'power2.out',
				opacity: 1,
			})

			gsap.to(scrollToExplore, {
				delay: 0.75,
				duration: 1,
				ease: 'power2.out',
				opacity: 1,
			})

			const pinTrigger = ScrollTrigger.create({
				end: '+=400%', // Pin for 4 screens
				onUpdate: (self) => {
					progress.current = self.progress
					gsap.to(scrollToExplore, {
						duration: 0.1,
						ease: 'none',
						opacity: 1 - progress.current * 3,
					})
				},
				pin: true,
				scrub: 1,
				start: 'top top',
				trigger: stickyBox,
			})

			gsap.to(container, {
				ease: 'none',
				opacity: 0,
				scrollTrigger: {
					end: () => pinTrigger.end + window.innerHeight,
					scrub: true,
					start: () => pinTrigger.end,
					trigger: container,
				},
			})
		},
		{ scope: containerRef },
	)

	return (
		<section className={styles.heroCubeSection} id={id} ref={containerRef}>
			{/* The trigger element needs to fill the viewport to start */}
			<div className={styles.stickyBox} ref={stickyBoxRef}>
				<ClientOnly>
					<Canvas className={styles.canvas}>
						<fog args={[backgroundColor, 5, 15]} attach="fog" />
						<PerspectiveCamera
							makeDefault
							position={[0, 1, 6]}
							rotation={[-0.2, 0, 0]}
						/>
						<ambientLight intensity={0.6} />
						<directionalLight intensity={1.5} position={[5, 5, 5]} />
						<Float floatIntensity={0.5} rotationIntensity={0.5} speed={2}>
							<Cube rotationProgress={progress} textItems={data?.textItems} />
						</Float>
						<ContactShadows
							blur={2.5}
							far={4}
							opacity={0.4}
							position={[0, -2, 0]}
							scale={10}
						/>
					</Canvas>
				</ClientOnly>

				{/* Scroll to explore button */}
				<div
					className={clsx(styles.scrollToExplore, 'body')}
					ref={scrollToExploreRef}
				>
					<span>SCROLL TO EXPLORE</span>
					<ArrowRightIcon className={styles.arrowRightIcon} />
				</div>
			</div>
		</section>
	)
}
