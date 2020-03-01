import * as https from 'https'

interface Option {
    [key: string]: string | undefined
}

interface Message {
    [key: string]: string | undefined
}

interface Response {
    statusCode: number | undefined
    result: string
}

function optional () {
    let opt: Option = {}
    let { env } = process

    Object.keys(env)
        .filter((key) => key.toUpperCase().startsWith('INPUT_SLACK-OPTIONAL-'))
        .forEach((key) => {
            let slackKey = key
                .replace('INPUT_SLACK-OPTIONAL-', '')
                .toLowerCase()
            opt[slackKey] = env[key]
        })

    return opt
}

export const buildMessage = (channel: string, text: string) => {
    let message: Message = {
        channel,
        text,
    }
    let option = optional()

    Object.keys(optional).forEach((name) => {
        message[name] = option[name]
    })

    return message
}

const getOptions = (token: string) => {
    return {
        hostname: 'slack.com',
        port: 443,
        path: '/api/chat.postMessage',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${token}`,
        },
    }
}

const post = (token: string, message: Message): Promise<Response> => {
    return new Promise((resolve, reject) => {
        let payload = JSON.stringify(message)
        let options = getOptions(token)

        let req = https.request(options, (res) => {
            let chunks: any[] = []

            res.on('data', (chunk) => {
                chunks.push(chunk)
            })

            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    result: Buffer.concat(chunks).toString(),
                })
            })
        })

        req.on('error', (error) => {
            reject(error)
        })

        req.write(payload)
        req.end()
    })
}

export const sendMessage = async (token: string, message: Message) => {
    let response = await post(token, message)
    let result = JSON.parse(response.result)

    if (!result || !result.ok || response.statusCode !== 200) {
        throw new Error(`Error! ${JSON.stringify(response)}`)
    }

    return response
}
