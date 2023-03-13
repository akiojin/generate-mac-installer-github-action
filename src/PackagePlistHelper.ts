import * as core from '@actions/core'
import * as fs from 'fs/promises'
import tmp from 'tmp'

export default class PacakgePlistHelper
{
    /**
     * Output ExportOptions.plist.
     * 
     * @param rootRelativeBundlePath Path to bundle relative to the destination root
     * @returns Path of generate .plist
     */
    static async Export(
        rootRelativeBundlePath: string): Promise<string>
    {
        const script = this.Generate(rootRelativeBundlePath)
        const plist = `${tmp.tmpNameSync()}.plist`
        await fs.writeFile(plist, script)
    
        core.startGroup('Generate "Package.plist"')
        core.info(`Package.plist:\n${script}`)
        core.endGroup()
    
        return plist;
    }
    
    /**
     * Generate Package plist
     * 
     * @param rootRelativeBundlePath Path to bundle relative to the destination root
     * @param bundleHasStrictIdentifier Don't install bundle if identifier doesn't match?
     * @param bundleIsRelocatable Install bundle over previous version if moved by user?
     * @param bundleIsVersionChecked Don't install bundle if newer version on disk?
     * @param bundleOverwriteAction How to treat existing on-disk version of bundle
     * @param bundlePostInstallScriptPath Relative path to bundle-specific postinstall script ChildBundles Bundles under this bundle
     * @param bundlePreInstallScriptPath Relative path to bundle-specific preinstall script
     * @returns 
     */
    static Generate(
        rootRelativeBundlePath: string,
        bundleHasStrictIdentifier: boolean = true,
        bundleIsRelocatable: boolean = false,
        bundleIsVersionChecked: boolean = true,
        bundleOverwriteAction: boolean = true,
        bundlePostInstallScriptPath: string = '',
        bundlePreInstallScriptPath: string = ''): string
    {
        return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<array>
  <dict>
    <key>BundleHasStrictIdentifier</key>
    <${bundleHasStrictIdentifier}/>
    <key>BundleIsRelocatable</key>
    <${bundleIsRelocatable}/>
    <key>BundleIsVersionChecked</key>
    <${bundleIsVersionChecked}/>
    <key>BundleOverwriteAction</key>
    <string>${bundleOverwriteAction ? 'upgrade' : 'update'}</string>
    <key>RootRelativeBundlePath</key>
    <string>${rootRelativeBundlePath}</string>
    <key>BundlePostInstallScriptPath</key>
    <string>${bundlePostInstallScriptPath}</string>
    <key>BundlePreInstallScriptPath</key>
    <string>${bundlePreInstallScriptPath}</string>
  </dict>
</array>
</plist>`;
    }
}