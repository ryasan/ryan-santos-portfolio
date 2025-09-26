import { SVGProps } from 'react'

export default function ArrowUpRightIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M9.5 8C9.5 7.72386 9.72386 7.5 10 7.5H16C16.2761 7.5 16.5 7.72386 16.5 8V14C16.5 14.2761 16.2761 14.5 16 14.5C15.7239 14.5 15.5 14.2761 15.5 14V9.20711L8.35355 16.3536C8.15829 16.5488 7.84171 16.5488 7.64645 16.3536C7.45118 16.1583 7.45118 15.8417 7.64645 15.6464L14.7929 8.5H10C9.72386 8.5 9.5 8.27614 9.5 8Z"
				fill="var(--content-color)"
			/>
		</svg>
	)
}
