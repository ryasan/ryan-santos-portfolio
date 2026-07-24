import { type SVGProps } from 'react'

export default function CopySimpleIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			fill="var(--content-color)"
			height="32"
			viewBox="0 0 256 256"
			width="32"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M184,64H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H184a8,8,0,0,0,8-8V72A8,8,0,0,0,184,64Zm-8,144H48V80H176ZM224,40V184a8,8,0,0,1-16,0V48H72a8,8,0,0,1,0-16H216A8,8,0,0,1,224,40Z"></path>
		</svg>
	)
}
