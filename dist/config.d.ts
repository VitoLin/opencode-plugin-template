export interface PluginConfig {
    /** Example custom setting */
    customSetting?: string;
    /** Enable debug logging */
    debug?: boolean;
    [key: string]: any;
}
/** Load user-level config from ~/.config/opencode/{plugin-name}.json */
export declare function loadPluginConfig(): PluginConfig | null;
/** Load project-level config from .opencode/{plugin-name}.json (overrides user config) */
export declare function loadPluginConfigWithProjectOverride(projectDir?: string): PluginConfig;
