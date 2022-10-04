import { createRequire } from 'node:module'
import path from 'node:path'
import process from 'node:process'

import { exec, getExecOutput } from '@actions/exec'

const require = createRequire(import.meta.url)
const { version } = require('../package.json')

const tag = `v${version}`
const majorVersion = `v${version.split('.')[0]}`

process.chdir(path.join(new URL('..', import.meta.url)))

async function release() {
	let { exitCode, stderr } = await getExecOutput(
		`git`,
		['ls-remote', '--exit-code', 'origin', '--tags', `refs/tags/${tag}`],
		{
			ignoreReturnCode: true,
		}
	)
	if (exitCode === 0) {
		console.log(
			`Action is not being published because version ${tag} is already published`
		)
		return
	}

	if (exitCode !== 2) {
		throw new Error(`git ls-remote exited with ${exitCode}:\n${stderr}`)
	}

	await exec('git', ['checkout', '--detach'])
	await exec('git', ['add', '--force', 'dist'])
	await exec('git', ['commit', '-m', tag])

	await exec('changeset', ['tag'])

	await exec('git', [
		'push',
		'--force',
		'--follow-tags',
		'origin',
		`HEAD:refs/heads/${majorVersion}`,
	])
}

await release()
