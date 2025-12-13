import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, PerspectiveCamera } from '@react-three/drei'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import * as THREE from 'three'

interface CubeProps {
	rotationProgress: React.MutableRefObject<number>
}

const Cube = ({ rotationProgress }: CubeProps) => {
	const meshRef = useRef<THREE.Mesh>(null)

	// Configuration
	const cubeSize = 3
	const txtOffset = cubeSize / 2 + 0.01 // Slightly offset text to avoid z-fighting
	const textColor = '#ffffff'
	const fontSize = 0.35

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
			<meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.1} />

			{/* Side 1: Front (0 deg) */}
			<Text
				position={[0, 0, txtOffset]}
				fontSize={fontSize}
				color={textColor}
				anchorX="center"
				anchorY="middle"
				textAlign="center"
				maxWidth={cubeSize - 0.2}
			>
				Hi, my name is Ryan
			</Text>

			{/* Side 2: Right (-90 deg) */}
			<Text
				position={[txtOffset, 0, 0]}
				rotation={[0, Math.PI / 2, 0]}
				fontSize={fontSize}
				color={textColor}
				anchorX="center"
				anchorY="middle"
				textAlign="center"
				maxWidth={cubeSize - 0.2}
			>
				I'm a Frontend Developer
			</Text>

			{/* Side 3: Back (-180 deg) */}
			<Text
				position={[0, 0, -txtOffset]}
				rotation={[0, Math.PI, 0]}
				fontSize={fontSize}
				color={textColor}
				anchorX="center"
				anchorY="middle"
				textAlign="center"
				maxWidth={cubeSize - 0.2}
			>
				I like to build web stuff to improve people's lives
			</Text>

			{/* Side 4: Left (-270 deg) */}
			<Text
				position={[-txtOffset, 0, 0]}
				rotation={[0, -Math.PI / 2, 0]}
				fontSize={fontSize}
				color={textColor}
				anchorX="center"
				anchorY="middle"
				textAlign="center"
				maxWidth={cubeSize - 0.2}
			>
				Keep scrolling to find out more
			</Text>
		</mesh>
	)
}

export default function HeroCubeSection(props: any) {
	const containerRef = useRef<HTMLDivElement>(null)
	const triggerRef = useRef<HTMLDivElement>(null)
	// Mutable ref to share scroll progress with the Canvas without re-renders
	const progress = useRef(0)

	useGSAP(
		() => {
			if (!triggerRef.current) return

			ScrollTrigger.create({
				trigger: triggerRef.current,
				start: 'top top',
				end: '+=400%', // Pin for 4 screens
				pin: true,
				scrub: 1, // Smooth scrubbing
				onUpdate: (self) => {
					progress.current = self.progress
				},
			})
		},
		{ scope: containerRef },
	)

	return (
		<div ref={containerRef} style={{ position: 'relative', zIndex: 10 }}>
			{/* The trigger element needs to fill the viewport to start */}
			<div
				ref={triggerRef}
				style={{ height: '100vh', width: '100%', overflow: 'hidden' }}
			>
				<Canvas>
					<PerspectiveCamera makeDefault position={[0, 0, 6]} />
					<ambientLight intensity={0.6} />
					<directionalLight position={[5, 5, 5]} intensity={1.5} />
					<Cube rotationProgress={progress} />
				</Canvas>
			</div>
		</div>
	)
}
