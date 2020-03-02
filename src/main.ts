import * as core from '@actions/core'

import { buildMessage, optionalParams, sendMessage } from './slack'

const stringify = (data: any) => JSON.stringify(data, undefined, 2)

const getRequired = (name: string): string =>
    core.getInput(name, { required: true })

export async function run (): Promise<void> {
    try {
        let token = getRequired('slack-bot-user-oauth-access-token')
        let channel = getRequired('slack-channel')
        let text = getRequired('slack-text')

        let message = buildMessage(channel, text, optionalParams())
        let result = await sendMessage(token, message)

        let resultAsJson = stringify(result)

        core.setOutput('slack-result', resultAsJson)
    } catch (error) {
        core.setFailed(stringify(error))
    }
}

run()
