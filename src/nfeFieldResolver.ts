import { nfeDictionary } from './nfeDictionary';

export interface ResolvedNfeTag {
  tagName: string;
  description: string;
  isBlock: boolean;
  models: string[];
  value: string | null;
}

const MODEL_LABELS: Record<string, string> = {
  "55": "NF-e (mod. 55)",
  "65": "NFC-e (mod. 65)",
  "57": "CT-e (mod. 57)",
  "62": "CT-e OS (mod. 62)",
  "13": "NFS-e (mod. 13)",
  "58": "MDF-e (mod. 58)"
};

// Mapeamento para cruzar o FiscalModel (string do detector) com os códigos de modelo do dicionário
const REVERSE_MODEL_MAP: Record<string, string[]> = {
  "nfe": ["55"],
  "nfce": ["65"],
  "cte": ["57"],
  "cteos": ["62"],
  "nfse": ["13"],
  "mdfe": ["58"]
};

export function resolveNfeTag(
  tagName: string,
  tagValue: string | null,
  detectedModel: string = 'unknown'
): ResolvedNfeTag | null {
  const entry = nfeDictionary[tagName];
  if (!entry) return null;

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
export function formatNfeHover(resolved: ResolvedNfeTag, detectedModel: string = 'unknown'): string {
  const icon = resolved.isBlock ? '📦' : '🏷️';
  const lines: string[] = [];

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