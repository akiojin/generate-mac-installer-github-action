# generate-mac-installer-github-action

This action creates an installer (.pkg) for macOS.

## Usage

```yml
- uses: akiojin/generate-mac-installer-github-action@v0.1.0
  with:
    root-directory: Build
    bundle-path: Build.app
    identifier: com.akiojin.GitHubActionsForUnity
```

## Arguments

### Inputs

| Name               | Required | Type     | Default       | Description                                                                                                          |
| ------------------ | -------- | -------- | ------------- | -------------------------------------------------------------------------------------------------------------------- |
| `output-directory` | `true`   | `string` | $RUNNER_TEMP  | Specifies the output directory. If omitted, runner.temp is set.                                                      |
| `root-directory`   | `true`   | `string` |               | The root path of the directory containing the set of resources to be bundled.                                        |
| `bundle-path`      | `true`   | `string` |               | Specify the relative path of *.app to be placed under the directory specified in 'root-directory' as the base point. |
| `identifier`       | `true`   | `string` |               | Specify the application ID.                                                                                          |
| `version`          | `true`   | `string` | 1.0           | Specifies the version of the package to be created.                                                                  |
| `install-location` | `false`  | `string` | /Applications | The directory where the package is to be installed. If omitted, '/Applications' is specified.                        |
| `script-directory` | `false`  | `string` |               | The directory containing installation scripts (e.g. preinstall/postinstall) passed to the `--scripts` argument of `pkgbuild`. If omitted, `--scripts` is not passed. |

### Outputs

| Name          | Type     | Description                     |
| ------------- | -------- | ------------------------------- |
| `output-path` | `string` | The output path of the package. |

## License

Any contributions made under this project will be governed by the [MIT License](https://github.com/akiojin/generate-mac-installer-github-action/blob/main/LICENSE).
