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
    "13": "NFS-e (mod. 13)"
};
function resolveNfeTag(tagName, tagValue) {
    const entry = nfeDictionary_1.nfeDictionary[tagName];
    if (!entry)
        return null;
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
function formatNfeHover(resolved) {
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