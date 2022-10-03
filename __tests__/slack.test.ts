import { buildActionButton } from '../src/slack'

describe('build action button', () => {
	it('builds a button object with a url', () => {
		let button = buildActionButton({ text: 'Text', url: 'localhost' })

		expect(button.text.text).toEqual('Text')
		expect(button.url).toEqual('localhost')
		expect(button.value).not.toBeDefined()
	})
})
