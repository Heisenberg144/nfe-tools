"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Script de build dos temas.
 * Rode com: npx ts-node scripts/generateThemes.ts
 */
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const themeBuilder_1 = require("../src/themes/themeBuilder");
const outDir = path.resolve(__dirname, '../themes');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}
for (const { filename, theme } of themeBuilder_1.ALL_THEMES) {
    const outPath = path.join(outDir, filename);
    fs.writeFileSync(outPath, JSON.stringify(theme, null, 2), 'utf-8');
    console.log(`✅ Gerado: themes/${filename}  (${theme.tokenColors.length} regras de cor)`);
}
console.log('\n🎨 Todos os temas NFe Tools gerados com sucesso!');
//# sourceMappingURL=generateThemes.js.map