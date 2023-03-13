export default class PacakgePlistHelper {
    /**
     * Output ExportOptions.plist.
     *
     * @param rootRelativeBundlePath Path to bundle relative to the destination root
     * @returns Path of generate .plist
     */
    static Export(rootRelativeBundlePath: string): Promise<string>;
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
    static Generate(rootRelativeBundlePath: string, bundleHasStrictIdentifier?: boolean, bundleIsRelocatable?: boolean, bundleIsVersionChecked?: boolean, bundleOverwriteAction?: boolean, bundlePostInstallScriptPath?: string, bundlePreInstallScriptPath?: string): string;
}
