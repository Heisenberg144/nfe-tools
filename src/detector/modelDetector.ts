/**
 * Detecta o modelo fiscal de um XML de documento eletrônico.
 *  tag raiz primeiro, cMod como fallback.
 */

export type FiscalModel =
  | 'nfe'    // NF-e modelo 55
  | 'nfce'   // NFC-e modelo 65
  | 'cte'    // CT-e modelo 57
  | 'cteos'  // CT-e OS modelo 67
  | 'nfse'   // NFS-e modelo 13
  | 'mdfe'   // MDF-e modelo 58
  | 'nfcom'  // NFCom modelo 62
  | 'unknown';

export interface DetectionResult {
  model: FiscalModel;
  label: string;
  themeId: string;
  languageId: string;
  detectedBy: 'rootTag' | 'cMod' | 'fallback';
}

// Mapa de tags raiz → modelo
const ROOT_TAG_MAP: Record<string, FiscalModel> = {
  nfeProc: 'nfe',
  NFe: 'nfe',
  cteProc: 'cte',
  CTe: 'cte',
  enviCTe: 'cte',
  retEnviCTe: 'cte',
  mdfeProc: 'mdfe',
  MDFe: 'mdfe',
  nfcomProc: 'nfcom',
  NFCom: 'nfcom',
  enviNFe: 'nfe',
  retEnviNFe: 'nfe',
  nfeCts: 'nfe',
  resNFe: 'nfe',
  CompNfse: 'nfse',
  Nfse: 'nfse',
  ListaNfse: 'nfse',
  ConsultarNfseResposta: 'nfse',
  DeclaracaoPrestacaoServico: 'nfse',
  NfseCabecMsg: 'nfse',
  NfseMsg: 'nfse',
  
  // Novas variações NFS-e 
  GerarNfseResposta: 'nfse',
  EnviarLoteRpsEnvio: 'nfse',
  EnviarLoteRpsResposta: 'nfse',
  RecepcionarLoteRps: 'nfse',
  ConsultarNfseFaixaResposta: 'nfse',
  ConsultarNfsePorRpsResposta: 'nfse',
  ConsultarLoteRpsResposta: 'nfse'
};

// Mapa de cMod → modelo (usado como fallback)
const CMOD_MAP: Record<string, FiscalModel> = {
  '55': 'nfe',
  '65': 'nfce',
  '57': 'cte',
  '67': 'cteos',
  '62': 'nfcom',
  '58': 'mdfe',
  '13': 'nfse',
};

const MODEL_META: Record<FiscalModel, { label: string; themeId: string; languageId: string }> = {
  nfe:    { label: 'NF-e (mod. 55)',    themeId: 'NF-e Dark Theme',   languageId: 'nfe'   },
  nfce:   { label: 'NFC-e (mod. 65)',   themeId: 'NFC-e Dark Theme',  languageId: 'nfce'  },
  cte:    { label: 'CT-e (mod. 57)',    themeId: 'CT-e Dark Theme',   languageId: 'cte'   },
  cteos:  { label: 'CT-e OS (mod. 67)', themeId: 'CT-e Dark Theme',   languageId: 'cte'   },
  nfse:   { label: 'NFS-e (mod. 13)',   themeId: 'NFS-e Dark Theme',  languageId: 'nfse'  },
  mdfe:   { label: 'MDF-e (mod. 58)',   themeId: 'MDF-e Dark Theme',  languageId: 'mdfe'  },
  nfcom:  { label: 'NFCom (mod. 62)',   themeId: 'NF-e Harmonic Theme', languageId: 'nfcom' },
  unknown:{ label: 'XML Fiscal',        themeId: 'NF-e Dark Theme',   languageId: 'nfe'   },
};

/**
 * Extrai as primeiras 30 linhas do conteúdo para análise rápida.
 */
function peekContent(content: string, lines = 30): string {
  return content.split('\n').slice(0, lines).join('\n');
}

/**
 * Detecta o modelo pelo nome da tag raiz (primeira tag real encontrada).
 */
function detectByRootTag(peek: string): FiscalModel | null {
  // Remove declaração XML e comentários
  const clean = peek.replace(/<\?xml[^>]*>/g, '').replace(/<!--[\s\S]*?-->/g, '').trim();

  // Pega a primeira tag de abertura
  const match = clean.match(/<([A-Za-z][A-Za-z0-9_:]*)/);
  if (!match) return null;

  // Remove namespace prefix se houver (ex: ns2:NFe → NFe)
  const tagName = match[1].includes(':') ? match[1].split(':').pop()! : match[1];

  return ROOT_TAG_MAP[tagName] ?? null;
}

/**
 * Detecta pelo cMod dentro do bloco <ide>.
 */
function detectByCMod(content: string): FiscalModel | null {
  const match = content.match(/<mod>(\d+)<\/mod>/);
  if (!match) return null;
  return CMOD_MAP[match[1]] ?? null;
}

/**
 * Função principal de detecção com fallback encadeado.
 * 1. Tag raiz
 * 2. cMod
 * 3. unknown
 */
export function detectFiscalModel(xmlContent: string): DetectionResult {
  const peek = peekContent(xmlContent);

  // Tentativa 1: tag raiz
  const byRoot = detectByRootTag(peek);
  if (byRoot) {
    // NF-e e NFC-e compartilham tags raiz — usa cMod pra diferenciar
    if (byRoot === 'nfe') {
      const byCmod = detectByCMod(xmlContent);
      if (byCmod === 'nfce') {
        return { model: 'nfce', ...MODEL_META['nfce'], detectedBy: 'cMod' };
      }
    }
    return { model: byRoot, ...MODEL_META[byRoot], detectedBy: 'rootTag' };
  }

  // Tentativa 2: cMod
  const byCmod = detectByCMod(xmlContent);
  if (byCmod) {
    return { model: byCmod, ...MODEL_META[byCmod], detectedBy: 'cMod' };
  }

  // Fallback
  return { model: 'unknown', ...MODEL_META['unknown'], detectedBy: 'fallback' };
}
