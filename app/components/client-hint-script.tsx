/**
 * This file contains utilities for using client hints for user preference which
 * are needed by the server, but are only known by the browser.
 */
import { getHintUtils, clientHint as colourSchemeHint } from '~/utils'

const hintsUtils = getHintUtils({ theme: colourSchemeHint })

export const { getHints } = hintsUtils;

/**
 * @returns inline script element that checks for client hints and sets cookies
 * if they are not set then reloads the page if any cookie was set to an
 * inaccurate value.
 */
export default function ClientHintScript() {
	return (
		<script
			dangerouslySetInnerHTML={{
				__html: hintsUtils.getClientHintCheckScript(),
			}}
		/>
	)
}
