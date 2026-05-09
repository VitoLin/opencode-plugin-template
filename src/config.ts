import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const PLUGIN_NAME = 'my-plugin';

export interface PluginConfig {
  /** Example custom setting */
  customSetting?: string;
  /** Enable debug logging */
  debug?: boolean;
  [key: string]: any;
}

function getConfigDir(): string {
  // OpenCode stores configs in ~/.config/opencode/
  return join(homedir(), '.config', 'opencode');
}

function parseJsonc<T>(content: string): T | null {
  try {
    // Simple JSONC parser that removes comments
    const cleaned = content
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '');
    return JSON.parse(cleaned) as T;
  } catch {
    return null;
  }
}

function loadConfigFromPath(path: string): PluginConfig | null {
  const jsoncPath = path.replace('.json', '.jsonc');

  if (existsSync(jsoncPath)) {
    try {
      const content = readFileSync(jsoncPath, 'utf-8');
      return parseJsonc<PluginConfig>(content);
    } catch {
      return null;
    }
  }

  if (existsSync(path)) {
    try {
      const content = readFileSync(path, 'utf-8');
      return JSON.parse(content) as PluginConfig;
    } catch {
      return null;
    }
  }

  return null;
}

/** Load user-level config from ~/.config/opencode/{plugin-name}.json */
export function loadPluginConfig(): PluginConfig | null {
  const configDir = getConfigDir();
  const configPath = join(configDir, `${PLUGIN_NAME}.json`);
  return loadConfigFromPath(configPath);
}

/** Load project-level config from .opencode/{plugin-name}.json (overrides user config) */
export function loadPluginConfigWithProjectOverride(
  projectDir: string = process.cwd()
): PluginConfig {
  const userConfig = loadPluginConfig() ?? {};
  const projectPath = join(projectDir, '.opencode', `${PLUGIN_NAME}.json`);
  const projectConfig = loadConfigFromPath(projectPath) ?? {};

  return { ...userConfig, ...projectConfig };
}
