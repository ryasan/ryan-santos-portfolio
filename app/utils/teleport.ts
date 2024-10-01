export function teleport(element: HTMLElement) {
	return {
		toStart: function (target: HTMLElement) {
			target.insertBefore(element, target.firstChild)
		},
		toEnd: function (target: HTMLElement) {
			target.appendChild(element)
		},
	}
}
