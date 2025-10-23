// import styles from '~/styles/components/hero.client.module.scss'
import { motion } from 'framer-motion'

type TestProps = {
	words: string[]
}

export default function Test({ words }: TestProps) {
	return null;
	// return (
	// 	<div className={styles.hero}>
	// 		<h1 className={styles.title}>
	// 			{words.map((word, index) => (
	// 				<span className={styles.wordMask} key={index}>
	// 					<motion.span
	// 						className={styles.word}
	// 						initial="hidden"
	// 						animate="visible"
	// 						variants={{
	// 							hidden: {
	// 								transform:
	// 									'translateY(calc(100% + 10px)) perspective(1200px)',
	// 							},
	// 							visible: {
	// 								transform: 'translateY(0) perspective(1200px)',
	// 								transition: {
	// 									duration: 0.75,
	// 									ease: [0.6, 0.1, 0.25, 1],
	// 									delay: index * 0.075,
	// 								},
	// 							},
	// 						}}
	// 						key={index}
	// 					>
	// 						{word}
	// 					</motion.span>
	// 					{index < words.length - 1 && <br />}
	// 				</span>
	// 			))}
	// 		</h1>
	// 		<motion.div
	// 			className={styles.subtitle}
	// 			initial="hidden"
	// 			animate="visible"
	// 			variants={{
	// 				hidden: {
	// 					opacity: 0,
	// 				},
	// 				visible: {
	// 					opacity: 1,
	// 					transition: {
	// 						duration: 1,
	// 						delay: 0.75,
	// 					},
	// 				},
	// 			}}
	// 		>
	// 			<div>
	// 				Currently building <br /> things @ Envoy
	// 			</div>
	// 			<div>(2022 - Present)</div>
	// 		</motion.div>
	// 	</div>
	// )
}
