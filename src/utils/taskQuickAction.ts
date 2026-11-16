const WINDOWS_ABSOLUTE_PATH = /^[A-Za-z]:\//;
const UNIX_ABSOLUTE_PATH = /^\//;

/**
 * 将任务 quick_action.path 解析到应用数据目录下。
 * 只接受相对路径，避免项目配置借用快捷按钮打开任意系统文件。
 */
export function resolveTaskQuickActionPath(dataPath: string, relativePath: string): string {
  const normalizedPath = relativePath.trim().replace(/\\/g, '/');
  if (!normalizedPath) {
    throw new Error('quick_action.path is empty');
  }
  if (WINDOWS_ABSOLUTE_PATH.test(normalizedPath) || UNIX_ABSOLUTE_PATH.test(normalizedPath)) {
    throw new Error('quick_action.path must be relative to the application data directory');
  }

  const parts = normalizedPath.split('/').filter((part) => part && part !== '.');
  if (parts.some((part) => part === '..')) {
    throw new Error('quick_action.path must not traverse outside the application data directory');
  }

  const normalizedBase = dataPath.trim().replace(/\\/g, '/').replace(/\/+$/, '');
  return [normalizedBase, ...parts].filter(Boolean).join('/');
}
