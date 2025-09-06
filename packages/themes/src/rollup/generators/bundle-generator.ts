import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function getThemeManagerAsset(): string {
  const assetPath = join(__dirname, '../assets/theme-manager.ts');
  return readFileSync(assetPath, 'utf-8');
}

export function getThemeInitAsset(): string {
  const assetPath = join(__dirname, '../assets/theme-init.ts');
  return readFileSync(assetPath, 'utf-8');
}

export function getSSRHelperAsset(): string {
  const assetPath = join(__dirname, '../assets/ssr-helpers.ts');
  return readFileSync(assetPath, 'utf-8');
}
