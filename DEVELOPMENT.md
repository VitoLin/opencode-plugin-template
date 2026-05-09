# Development

To work on the plugin locally:

1. Clone the repository
2. Point OpenCode to your local copy in `~/.config/opencode/opencode.json`:

```json
{
  "plugins": ["/path/to/this/directory"]
}
```

3. Changes are immediately reflected when you run OpenCode

## Scripts

```bash
# Build
bun run build

# Test
bun test

# Format
bun run format
```

## Developer Notes

- If you add config logic, prefer exporting small helper functions to make behavior easily testable.
- Add unit tests for config values rather than relying on module-level constants.
