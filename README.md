# OpenCode Plugin Template

A minimal starting point for building [OpenCode](https://opencode.ai/) plugins with TypeScript and configuration support.

## Quick Start

### 1. Install dependencies

```bash
bun install
```

### 2. Build the plugin

```bash
bun run build
```

### 3. Configure OpenCode to load your plugin

Edit `~/.config/opencode/opencode.json`:

```json
{
  "plugins": ["/path/to/this/directory"]
}
```

> Use `"plugins": ["opencode-plugin-template"]` if you publish to npm.

## Configuration

Create a config file at `~/.config/opencode/my-plugin.json`:

```json
{
  "customSetting": "hello world",
  "debug": true
}
```

Or for project-specific settings, create `.opencode/my-plugin.json` in your project root. Project configs override user configs.

Both `.json` and `.jsonc` (with comments) formats are supported.

## Plugin Structure

```
.
├── src/
│   ├── index.ts      # Plugin entry point — exports a Plugin function
│   └── config.ts     # Config loading with user + project override support
├── package.json      # opencode.plugin = true marks this as a plugin
├── tsconfig.json     # TypeScript config targeting ESNext + bundler resolution
├── bunfig.toml       # Bun test configuration with coverage
├── .prettierrc       # Code formatting rules
└── .husky/           # Git hooks for lint-staged, tests, and gitleaks
```

## Customization

1. Rename `PLUGIN_NAME` in `src/config.ts` from `"my-plugin"` to your plugin's name.
2. Update `package.json` `name`, `description`, and `author`.
3. Add hooks in `src/index.ts` — see the OpenCode plugin API docs for available hooks (`config`, `systemTransform`, `beforeRequest`, etc.).
4. Run `bun run build` after any changes.

## Scripts

```bash
bun run build        # Compile TypeScript to dist/
bun test             # Run tests with coverage
bun run format       # Format code with Prettier
bun run format:check # Check formatting without writing
```

## Publishing

```bash
npm publish
```

Users can then install via:

```json
{
  "plugins": ["your-plugin-name"]
}
```

## License

MIT
