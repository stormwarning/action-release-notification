import process from 'node:process'

import * as core from '@actions/core'
import { context } from '@actions/github'
import { ChatPostMessageArguments, WebClient } from '@slack/web-api'

import { buildActionButton } from './slack'

interface ButtonOptions {
	text: string
	url?: string
	value?: string
}

const stringify = (data: any) => JSON.stringify(data, undefined, 2)

const getRequired = (name: string): string =>
	core.getInput(name, { required: true })

export async function run(): Promise<void> {
	try {
		let channel = getRequired('channel')
		let message = getRequired('message')
		let actions: ButtonOptions[] = JSON.parse(
			core.getInput('actions')
		) as ButtonOptions[]
		let token = process.env.SLACKBOT_TOKEN
		let slack = new WebClient(token)

		if (!channel) {
			core.setFailed('You must provide a `channel`')
			return
		}

		let args: ChatPostMessageArguments = {
			channel,
			text: message,
			blocks: [
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: message,
					},
				},
			],
			mrkdwn: true,
		}

		let { ref } = context
		let match = /(\d+.\d+.\d+-?[\d.a-z]*)/.exec(ref)
		let version = match ? match[1] : null

		if (version) {
			args.blocks?.push({
				type: 'context',
				elements: [
					{
						type: 'mrkdwn',
						text: `*🔖 ${version}*`,
					},
				],
			})
		}

		if (actions) {
			let elements = actions.map(({ text, url }) =>
				buildActionButton({ text, url })
			)
			args.blocks?.push({
				type: 'actions',
				elements,
			})
		}

		let response = await slack.chat.postMessage(args)

		core.setOutput('slack-result', stringify(response))
	} catch (error: unknown) {
		core.setFailed(stringify(error))
	}
}
