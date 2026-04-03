/**
 * Script de build dos temas.
 * Rode com: npx ts-node scripts/generateThemes.ts
 */
import * as fs from 'fs';
import * as path from 'path';
import { ALL_THEMES } from '../src/themes/themeBuilder';

const outDir = path.resolve(__dirname, '../themes');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

for (const { filename, theme } of ALL_THEMES) {
  const outPath = path.join(outDir, filename);
  fs.writeFileSync(outPath, JSON.stringify(theme, null, 2), 'utf-8');
  console.log(`✅ Gerado: themes/${filename}  (${theme.tokenColors.length} regras de cor)`);
}

console.log('\n🎨 Todos os temas NFe Tools gerados com sucesso!');
