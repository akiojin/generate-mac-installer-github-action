import * as core from '@actions/core'
import * as exec from '@actions/exec'
import path from 'path'
import { ArgumentBuilder } from '@akiojin/argument-builder'
import PackagePlistHelper from './PackagePlistHelper'

const IsMacOS = process.platform.toLowerCase() === 'darwin'

function GetOutputPath()
{
    return path.join(core.getInput('output-directory'), `${path.basename(core.getInput('bundle-path'), '.app')}.pkg`)
}

async function ExportPKG(): Promise<void>
{
    const plist = await PackagePlistHelper.Export(core.getInput('bundle-path'))

    const outputPath = GetOutputPath()
    const builder = new ArgumentBuilder()
        .Append('--root', core.getInput('root-directory'))
        .Append('--component-plist', plist)
        .Append('--identifier', core.getInput('identifier'))
        .Append('--version', core.getInput('version'))
        .Append('--install-location', core.getInput('install-location'))

    if (core.getInput('scripts-directory') !== '') {
        builder.Append('--scripts', core.getInput('scripts-directory'))
    }

    builder.Append(outputPath)

    core.setOutput('output-path', outputPath)
    core.info(`Output Path: ${outputPath}`)

    await exec.exec('pkgbuild', builder.Build())
}

async function Run()
{
    try {
        await ExportPKG()
    } catch (ex: any) {
        core.setFailed(ex.message)
    }
}

if (!IsMacOS) {
    core.setFailed('Action requires macOS agent.')
} else {
    Run()
}
