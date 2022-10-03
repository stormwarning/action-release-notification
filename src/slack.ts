import type { Button } from '@slack/types'

interface ButtonOptions {
	text: string
	url?: string
	value?: string
}

export function buildActionButton(options: ButtonOptions): Button {
	let { text, url, value } = options

	return {
		type: 'button',
		text: {
			type: 'plain_text',
			text,
			emoji: true,
		},
		url,
		value,
	}
}
