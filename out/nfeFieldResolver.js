"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveNfeTag = resolveNfeTag;
exports.formatNfeHover = formatNfeHover;
const nfeDictionary_1 = require("./nfeDictionary");
const MODEL_LABELS = {
    "55": "NF-e (mod. 55)",
    "65": "NFC-e (mod. 65)",
    "57": "CT-e (mod. 57)",
    "62": "CT-e OS (mod. 62)",
    "13": "NFS-e (mod. 13)",
    "58": "MDF-e (mod. 58)"
};
// Mapeamento para cruzar o FiscalModel (string do detector) com os códigos de modelo do dicionário
const REVERSE_MODEL_MAP = {
    "nfe": ["55"],
    "nfce": ["65"],
    "cte": ["57"],
    "cteos": ["62"],
    "nfse": ["13"],
    "mdfe": ["58"]
};
function resolveNfeTag(tagName, tagValue, detectedModel = 'unknown') {
    const entry = nfeDictionary_1.nfeDictionary[tagName];
    if (!entry)
        return null;
    // Filtra tags que não pertencem ao modelo do arquivo atual
    if (entry.models && entry.models.length > 0 && detectedModel !== 'unknown') {
        const allowedCmods = REVERSE_MODEL_MAP[detectedModel] || [];
        const isAllowed = entry.models.some(m => allowedCmods.includes(m));
        if (!isAllowed) {
            return null;
        }
    }
    return {
        tagName,
        description: entry.description,
        isBlock: entry.isBlock ?? false,
        models: entry.models ?? [],
        value: tagValue
    };
}
/**
 * Formata o resultado em Markdown para exibição no hover do VS Code.
 */
function formatNfeHover(resolved, detectedModel = 'unknown') {
    const icon = resolved.isBlock ? '📦' : '🏷️';
    const lines = [];
    lines.push(`### ${icon} \`${resolved.tagName}\``);
    lines.push('');
    lines.push(resolved.description);
    if (resolved.value) {
        lines.push('');
        lines.push(`**Valor:** \`${resolved.value}\``);
    }
    if (resolved.models.length > 0) {
        const modelList = resolved.models
            .map(m => MODEL_LABELS[m] ?? `mod. ${m}`)
            .join(' · ');
        lines.push('');
        lines.push(`---`);
        lines.push(`_${modelList}_`);
    }
    return lines.join('\n');
}
//# sourceMappingURL=nfeFieldResolver.js.map