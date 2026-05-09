import type { Plugin } from '@opencode-ai/plugin';
import { loadPluginConfig } from './config.js';

const MyPlugin: Plugin = async () => {
  const config = loadPluginConfig();

  console.log('[MyPlugin] Loaded config:', config);

  return {
    config: async (currentConfig: any) => {
      // Modify OpenCode configuration here
      // Example: add MCP servers, change model settings, etc.
      if (config?.customSetting) {
        currentConfig.customSetting = config.customSetting;
      }
    },
  };
};

export default MyPlugin;
