# typedoc-plugin-icp-docs

This is a plugin for [Typedoc](https://typedoc.org/) that prepares Markdown documentation to be published to [js.icp.build](https://js.icp.build).

## Installation

```shell
npm install --save-dev @dfinity/typedoc-plugin-icp-docs
```

> This plugin requires the [typedoc-plugin-markdown](https://typedoc-plugin-markdown.org/) and [typedoc-plugin-frontmatter](https://typedoc-plugin-markdown.org/plugins/frontmatter) plugins, so you need to install them as well.

## Usage

In your `typedoc.json` file, add the plugin and the output:

```json
{
  "out": "src/content/tmp",
  "plugins": [
    "typedoc-plugin-markdown",
    "typedoc-plugin-frontmatter",
    "@dfinity/typedoc-plugin-icp-docs"
  ],
  "outputs": [
    { "name": "markdown", "path": "src/content/tmp" },
    { "name": "icp-docs", "path": "src/content/docs" }
  ]
}
```

> This plugin requires the [typedoc-plugin-markdown](https://typedoc-plugin-markdown.org/) and [typedoc-plugin-frontmatter](https://typedoc-plugin-markdown.org/plugins/frontmatter) plugins, so you need to configure them as well.

For a more concrete setup example, see the [docs](https://github.com/dfinity/pic-js/tree/main/docs/) folder of the [dfinity/pic-js](https://github.com/dfinity/pic-js) repository.

## Development

See [HACKING.md](./HACKING.md) for more information.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for more information.

## License

This project is licensed under the Apache License 2.0. See [LICENSE](./LICENSE) for more information.
