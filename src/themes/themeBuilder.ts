

 export interface ThemeTokenColor {
   name: string;
   scope: string | string[];
   settings: {
     foreground?: string;
     fontStyle?: string;
     background?: string;
   };
 }
 
 export interface VsCodeTheme {
   name: string;
   type: 'dark' | 'light';
   colors: Record<string, string>;
   tokenColors: ThemeTokenColor[];
 }
 
 //  Paletas por modelo 
 
 type Palette = {
   // Editor UI
   bg: string;
   bgLine: string;
   bgSelection: string;
   fg: string;
   // Blocos principais
   root: string;
   inf: string;
   ide: string;
   emitDest: string;
   det: string;
   prod: string;
   // Impostos - cor base e degradês
   imposto: string;
   icms: string;
   icmsAliq: string;
   icmsBase: string;
   icmsValor: string;
   ipi: string;
   ipiAliq: string;
   ipiBase: string;
   ipiValor: string;
   pis: string;
   pisAliq: string;
   pisBase: string;
   pisValor: string;
   cofins: string;
   cofinsAliq: string;
   cofinsBase: string;
   cofinsValor: string;
   // Totais e especiais
   total: string;
   valorTotal: string;
   transp: string;
   cob: string;
   infAdic: string;
   prot: string;
   // Campos gerais
   chaveAcesso: string;
   cnpj: string;
   cpf: string;
   numero: string;
   cfop: string;
   cst: string;
   data: string;
   // Tags genéricas
   tagGeneric: string;
   tagSupport: string;
   punct: string;
   dataValue: string;
   attrName: string;
   attrValue: string;
   comment: string;
   
   // NFS-e Específico
   nfseServico: string;
   nfseValores: string;
   nfsePrestadorTomador: string;
   cteCarga: string;
   cteModal: string;
   mdfeVeiculo: string;
 };
 
 const PALETTES: Record<string, Palette> = {
 
   //  NF-e: Arco-íris Neon
   nfe: {
     bg: '#0B0D14',
     bgLine: '#151826',
     bgSelection: '#2A3B5F',
     fg: '#E0E6ED',
     root:     '#9C27B0',
     inf:      '#651FFF',
     ide:      '#3D5AFE',
     emitDest: '#00E5FF',
     det:      '#00E676',
     prod:     '#69F0AE',
     imposto:  '#FFEA00',
     icms:     '#FFC400',
     icmsAliq: '#FFD54F',
     icmsBase: '#FFE082',
     icmsValor:'#FFECB3',
     ipi:      '#FF9100',
     ipiAliq:  '#FFB74D',
     ipiBase:  '#FFCC80',
     ipiValor: '#FFE0B2',
     pis:      '#FF6D00',
     pisAliq:  '#FF8A65',
     pisBase:  '#FFAB91',
     pisValor: '#FFCCBC',
     cofins:   '#FF3D00',
     cofinsAliq:'#FF9E80',
     cofinsBase:'#FFCCBC',
     cofinsValor:'#FBE9E7',
     total:    '#FF1744',
     valorTotal:'#FF8A80',
     transp:   '#F50057',
     cob:      '#D500F9',
     infAdic:  '#AA00FF',
     prot:     '#6200EA',
     chaveAcesso:'#18FFFF',
     cnpj:     '#FFD600',
     cpf:      '#FFAB40',
     numero:   '#E0E0E0',
     cfop:     '#FF6E40',
     cst:      '#FF9E80',
     data:     '#80CBC4',
     tagGeneric:'#E06C75',
     tagSupport:'#E06C75',
     punct:    '#5C6370',
     dataValue:'#E5C07B',
     attrName: '#D19A66',
     attrValue:'#98C379',
     comment:  '#5C6370',
     nfseServico: '#00E676',
     nfseValores: '#FF1744',
     nfsePrestadorTomador: '#00E5FF',
     cteCarga: '#69F0AE',
     cteModal: '#3D5AFE',
     mdfeVeiculo: '#FF9100',
   },
 
   //  NF-e Harmonic
   nfeHarmonic: {
     bg: '#0D1117',
     bgLine: '#161B22',
     bgSelection: '#23863644',
     fg: '#C9D1D9',
     root:     '#D2A8FF', // Soft Purple
     inf:      '#B392F0', // Lavender
     ide:      '#8992F3', // Soft Indigo
     emitDest: '#79B8FF', // Light Blue
     det:      '#73E3FF', // Cyan
     prod:     '#56D4C8', // Deep Cyan
     imposto:  '#3FB950', // Emerald Green
     icms:     '#2EA043', // Green
     icmsAliq: '#56D364',
     icmsBase: '#85E89D',
     icmsValor:'#AFF5B4',
     ipi:      '#43B062', // Muted Green
     ipiAliq:  '#6BC482',
     ipiBase:  '#9EE0AC',
     ipiValor: '#C6F2CD',
     pis:      '#66C075', // Light Sea Green
     pisAliq:  '#8CD197',
     pisBase:  '#B8E6BF',
     pisValor: '#D5F5D9',
     cofins:   '#86CE87', // Pale Green
     cofinsAliq:'#A8E0A9',
     cofinsBase:'#CDEBCC',
     cofinsValor:'#E3F5E1',
     total:    '#A5D6A7', // Light Green-Yellow
     valorTotal:'#C8E6C9',
     transp:   '#E6EE9C', // Pale Yellow
     cob:      '#FFF59D', // Light Yellow
     infAdic:  '#FFE082', // Peach
     prot:     '#FFCB86', // Soft Orange
     chaveAcesso:'#73E3FF',
     cnpj:     '#F2CC60',
     cpf:      '#E3B341',
     numero:   '#FFFFFF',
     cfop:     '#FF98A4',
     cst:      '#FFB6C1',
     data:     '#79B8FF',
     tagGeneric:'#F78166',
     tagSupport:'#FFAB70',
     punct:    '#484F58',
     dataValue:'#F1E05A',
     attrName: '#7EE787',
     attrValue:'#A5D6FF',
     comment:  '#8B949E',
     nfseServico: '#73E3FF',
     nfseValores: '#A5D6A7',
     nfsePrestadorTomador: '#79B8FF',
     cteCarga: '#56D4C8',
     cteModal: '#8992F3',
     mdfeVeiculo: '#FFCB86',
   },
 
   //  NFC-e: Ciano elétrico 
   nfce: {
     bg: '#08100f',
     bgLine: '#0e1a1a',
     bgSelection: '#0d3030',
     fg: '#c0d8d8',
     root:     '#00E5FF',
     inf:      '#84FFFF',
     ide:      '#64FFDA',
     emitDest: '#A7FFEB',
     det:      '#FF6D00',
     prod:     '#FF9E40',
     imposto:  '#00BCD4',
     icms:     '#00E5FF',
     icmsAliq: '#80DEEA',
     icmsBase: '#B2EBF2',
     icmsValor:'#E0F7FA',
     ipi:      '#AA00FF',
     ipiAliq:  '#EA80FC',
     ipiBase:  '#F3CBFF',
     ipiValor: '#F8E8FF',
     pis:      '#76FF03',
     pisAliq:  '#CCFF90',
     pisBase:  '#E8FFD0',
     pisValor: '#F1FFE8',
     cofins:   '#FFD740',
     cofinsAliq:'#FFE57F',
     cofinsBase:'#FFF8D6',
     cofinsValor:'#FFFDE7',
     total:    '#84FFFF',
     valorTotal:'#00E5FF',
     transp:   '#607D8B',
     cob:      '#78909C',
     infAdic:  '#546E7A',
     prot:     '#00ACC1',
     chaveAcesso:'#18FFFF',
     cnpj:     '#FFD740',
     cpf:      '#FFAB40',
     numero:   '#E0E0E0',
     cfop:     '#FF6E40',
     cst:      '#FF9E80',
     data:     '#80DEEA',
     tagGeneric:'#2C3E3F',
     tagSupport:'#37474F',
     punct:    '#37474F',
     dataValue:'#E5C07B',
     attrName: '#546E7A',
     attrValue:'#455A64',
     comment:  '#1A3535',
     nfseServico: '#FF6D00',
     nfseValores: '#84FFFF',
     nfsePrestadorTomador: '#A7FFEB',
     cteCarga: '#FF9E40',
     cteModal: '#64FFDA',
     mdfeVeiculo: '#AA00FF',
   },
 
   //  CT-e: Âmbar 
   cte: {
     bg: '#100e00',
     bgLine: '#1a1700',
     bgSelection: '#332800',
     fg: '#d8d0b8',
     root:     '#FFD600',
     inf:      '#FFE57F',
     ide:      '#FF6D00',
     emitDest: '#FF9E40',
     det:      '#76FF03',
     prod:     '#CCFF90',
     imposto:  '#FFC400',
     icms:     '#FFD740',
     icmsAliq: '#FFE57F',
     icmsBase: '#FFF3BF',
     icmsValor:'#FFFDE7',
     ipi:      '#E040FB',
     ipiAliq:  '#F48FB1',
     ipiBase:  '#FCE4EC',
     ipiValor: '#FDE8F8',
     pis:      '#40C4FF',
     pisAliq:  '#B3E5FC',
     pisBase:  '#E1F5FE',
     pisValor: '#EDF8FF',
     cofins:   '#69F0AE',
     cofinsAliq:'#B9F6CA',
     cofinsBase:'#DFFFF0',
     cofinsValor:'#F1FFF7',
     total:    '#FFE57F',
     valorTotal:'#FFD600',
     transp:   '#FF8F00',
     cob:      '#FFA000',
     infAdic:  '#795548',
     prot:     '#FF8F00',
     chaveAcesso:'#FFEA00',
     cnpj:     '#FF6D00',
     cpf:      '#FF9E40',
     numero:   '#E0E0E0',
     cfop:     '#40C4FF',
     cst:      '#80D8FF',
     data:     '#FFD54F',
     tagGeneric:'#3E3000',
     tagSupport:'#4A3A00',
     punct:    '#4A3A00',
     dataValue:'#E5C07B',
     attrName: '#6D5700',
     attrValue:'#5C4A00',
     comment:  '#332800',
     nfseServico: '#76FF03',
     nfseValores: '#FFE57F',
     nfsePrestadorTomador: '#FF9E40',
     cteCarga: '#CCFF90',
     cteModal: '#FF6D00',
     mdfeVeiculo: '#FF8F00',
   },
 
   //  NFS-e: Roxo violeta 
   nfse: {
     bg: '#0d0a14',
     bgLine: '#160f22',
     bgSelection: '#2a1a44',
     fg: '#ccc0d8',
     root:     '#EA80FC',
     inf:      '#CE93D8',
     ide:      '#80D8FF',
     emitDest: '#B3E5FC',
     det:      '#CCFF90',
     prod:     '#E8FFD0',
     imposto:  '#7C4DFF',
     icms:     '#B388FF',
     icmsAliq: '#CFB8FF',
     icmsBase: '#E1D5FF',
     icmsValor:'#EDE7FF',
     ipi:      '#EA80FC',
     ipiAliq:  '#F3ABFF',
     ipiBase:  '#F9D8FF',
     ipiValor: '#FCF0FF',
     pis:      '#40C4FF',
     pisAliq:  '#B3E5FC',
     pisBase:  '#E1F5FE',
     pisValor: '#EDF8FF',
     cofins:   '#69F0AE',
     cofinsAliq:'#B9F6CA',
     cofinsBase:'#E0FFF0',
     cofinsValor:'#F1FFF7',
     total:    '#CE93D8',
     valorTotal:'#EA80FC',
     transp:   '#9575CD',
     cob:      '#AB47BC',
     infAdic:  '#7B1FA2',
     prot:     '#8E24AA',
     chaveAcesso:'#E040FB',
     cnpj:     '#FFCA28',
     cpf:      '#FFA726',
     numero:   '#E0E0E0',
     cfop:     '#FF8A65',
     cst:      '#FFAB91',
     data:     '#CE93D8',
     tagGeneric:'#2A1A44',
     tagSupport:'#351F55',
     punct:    '#351F55',
     dataValue:'#E5C07B',
     attrName: '#4A3066',
     attrValue:'#3D2660',
     comment:  '#220F38',
     nfseServico: '#CCFF90',
     nfseValores: '#CE93D8',
     nfsePrestadorTomador: '#B3E5FC',
     cteCarga: '#E8FFD0',
     cteModal: '#80D8FF',
     mdfeVeiculo: '#EA80FC',
   },
 
   //  MDF-e: Laranja intenso 
   mdfe: {
     bg: '#100700',
     bgLine: '#1a0e00',
     bgSelection: '#331a00',
     fg: '#d8c8b8',
     root:     '#FF6D00',
     inf:      '#FF9E40',
     ide:      '#FFCA28',
     emitDest: '#FFE082',
     det:      '#69F0AE',
     prod:     '#B9F6CA',
     imposto:  '#FF3D00',
     icms:     '#FF6E40',
     icmsAliq: '#FF9E80',
     icmsBase: '#FFCCBC',
     icmsValor:'#FBE9E7',
     ipi:      '#D500F9',
     ipiAliq:  '#EA80FC',
     ipiBase:  '#F3CBFF',
     ipiValor: '#F8E8FF',
     pis:      '#00E5FF',
     pisAliq:  '#84FFFF',
     pisBase:  '#CCFFFF',
     pisValor: '#E8FFFF',
     cofins:   '#76FF03',
     cofinsAliq:'#CCFF90',
     cofinsBase:'#E8FFCF',
     cofinsValor:'#F3FFE8',
     total:    '#FF9E40',
     valorTotal:'#FF6D00',
     transp:   '#BF360C',
     cob:      '#D84315',
     infAdic:  '#6D4C41',
     prot:     '#E64A19',
     chaveAcesso:'#FF9100',
     cnpj:     '#FFCA28',
     cpf:      '#FFB300',
     numero:   '#E0E0E0',
     cfop:     '#40C4FF',
     cst:      '#80D8FF',
     data:     '#FFAB40',
     tagGeneric:'#2C1500',
     tagSupport:'#3E1F00',
     punct:    '#3E1F00',
     dataValue:'#E5C07B',
     attrName: '#5C3317',
     attrValue:'#4A2800',
     comment:  '#2C1500',
     nfseServico: '#69F0AE',
     nfseValores: '#FF9E40',
     nfsePrestadorTomador: '#FFE082',
     cteCarga: '#B9F6CA',
     cteModal: '#FFCA28',
     mdfeVeiculo: '#D500F9',
   },
 };
 
 //  Construtor de tokenColors 
//* Função utilitária para mapear escopos XML incluindo a pontuação e os nomes de entidade.

 function tagScope(base: string): string[] {
   return [`${base} punctuation.definition.tag`, `${base} entity.name.tag`];
 }

 function buildTokenColors(p: Palette): ThemeTokenColor[] {
   return [
     {
       name: 'XML Declaration',
       scope: ['meta.xml-declaration.nfe', 'comment.block.xml.nfe'],
       settings: { foreground: p.comment, fontStyle: 'italic' },
     },
     {
       name: 'XML Comment',
       scope: 'comment.block.nfe',
       settings: { foreground: p.comment, fontStyle: 'italic' },
     },
     {
       name: 'Conteúdo valor',
       scope: 'string.value.nfe',
       settings: { foreground: p.dataValue, fontStyle: 'bold' }
     },
     {
       name: 'Pontuação Genérica (< >)',
       scope: 'punctuation.definition.tag.nfe',
       settings: { foreground: p.punct }
     },
     {
       name: 'Tag suporte (nome)',
       scope: 'support.type.tag.nfe',
       settings: { foreground: p.tagSupport },
     },
     {
       name: 'Tag genérica',
       scope: ['entity.name.tag', 'support.type.tag'],
       settings: { foreground: p.tagGeneric },
     },
     {
       name: 'Atributo — nome',
       scope: ['entity.other.attribute-name.nfe', 'entity.other.attribute-name'],
       settings: { foreground: p.attrName },
     },
     {
       name: 'Atributo — valor',
       scope: ['string.quoted.double.nfe', 'string.quoted.double'],
       settings: { foreground: p.attrValue },
     },
     {
       name: 'Chave de Acesso',
       scope: 'nfe.tag.chave.value',
       settings: { foreground: p.chaveAcesso, fontStyle: 'bold underline' },
     },
     {
       name: 'CNPJ',
       scope: ['nfe.tag.cnpj', 'nfe.tag.cnpj punctuation.definition.tag', 'nfe.tag.cnpj entity.name.tag'],
       settings: { foreground: p.cnpj, fontStyle: 'bold' },
     },
     {
       name: 'CPF',
       scope: ['nfe.tag.cpf', 'nfe.tag.cpf punctuation.definition.tag', 'nfe.tag.cpf entity.name.tag'],
       settings: { foreground: p.cpf, fontStyle: 'bold' },
     },
     
     // ── Lógica Dinâmica de Hierarquia (L0, L1, L2, L3) 
     { name: 'raiz L0', scope: tagScope("nfe.tag.raiz.l0"), settings: { foreground: p.root, fontStyle: 'bold' } },
     { name: 'raiz L1', scope: tagScope("nfe.tag.raiz.l1"), settings: { foreground: p.inf } },
 
     { name: 'inf L0', scope: tagScope("nfe.tag.inf.l0"), settings: { foreground: p.inf, fontStyle: 'bold' } },
     { name: 'inf L1', scope: tagScope("nfe.tag.inf.l1"), settings: { foreground: p.ide } },
 
     { name: 'ide L0', scope: tagScope("nfe.tag.ide.l0"), settings: { foreground: p.ide, fontStyle: 'bold' } },
     { name: 'ide L1', scope: tagScope("nfe.tag.ide.l1"), settings: { foreground: p.emitDest } },
     { name: 'ide L2', scope: tagScope("nfe.tag.ide.l2"), settings: { foreground: p.det } },
 
     { name: 'emitdest L0', scope: tagScope("nfe.tag.emitdest.l0"), settings: { foreground: p.emitDest, fontStyle: 'bold' } },
     { name: 'emitdest L1', scope: tagScope("nfe.tag.emitdest.l1"), settings: { foreground: p.det } },
 
     { name: 'det L0', scope: tagScope("nfe.tag.det.l0"), settings: { foreground: p.det, fontStyle: 'bold' } },
     { name: 'det L1', scope: tagScope("nfe.tag.det.l1"), settings: { foreground: p.prod } },
     { name: 'det L2', scope: tagScope("nfe.tag.det.l2"), settings: { foreground: p.imposto } },
     { name: 'det L3', scope: tagScope("nfe.tag.det.l3"), settings: { foreground: p.icms } },
 
     { name: 'total L0', scope: tagScope("nfe.tag.total.l0"), settings: { foreground: p.total, fontStyle: 'bold' } },
     { name: 'total L1', scope: tagScope("nfe.tag.total.l1"), settings: { foreground: p.valorTotal } },
     { name: 'total L2', scope: tagScope("nfe.tag.total.l2"), settings: { foreground: p.total } },
 
     { name: 'transp L0', scope: tagScope("nfe.tag.transp.l0"), settings: { foreground: p.transp, fontStyle: 'bold' } },
     { name: 'transp L1', scope: tagScope("nfe.tag.transp.l1"), settings: { foreground: p.cob } },
 
     { name: 'cob L0', scope: tagScope("nfe.tag.cob.l0"), settings: { foreground: p.cob, fontStyle: 'bold' } },
     { name: 'cob L1', scope: tagScope("nfe.tag.cob.l1"), settings: { foreground: p.infAdic } },
 
     { name: 'infadic L0', scope: tagScope("nfe.tag.infadic.l0"), settings: { foreground: p.infAdic, fontStyle: 'bold' } },
     { name: 'infadic L1', scope: tagScope("nfe.tag.infadic.l1"), settings: { foreground: p.prot } },
 
     { name: 'prot L0', scope: tagScope("nfe.tag.prot.l0"), settings: { foreground: p.prot, fontStyle: 'bold' } },
     { name: 'prot L1', scope: tagScope("nfe.tag.prot.l1"), settings: { foreground: p.root } },
 
     { name: 'imposto L0', scope: tagScope("nfe.tag.imposto.l0"), settings: { foreground: p.imposto, fontStyle: 'bold' } },
     { name: 'imposto L1', scope: tagScope("nfe.tag.imposto.l1"), settings: { foreground: p.icms } },
     { name: 'imposto L2', scope: tagScope("nfe.tag.imposto.l2"), settings: { foreground: p.icmsAliq } },
 
     { name: 'icms L0', scope: tagScope("nfe.tag.icms.l0"), settings: { foreground: p.icms, fontStyle: 'bold' } },
     { name: 'icms L1', scope: tagScope("nfe.tag.icms.l1"), settings: { foreground: p.icmsAliq } },
     { name: 'icms L2', scope: tagScope("nfe.tag.icms.l2"), settings: { foreground: p.icmsBase } },
     { name: 'icms L3', scope: tagScope("nfe.tag.icms.l3"), settings: { foreground: p.icmsValor } },
     { name: 'icms L4', scope: tagScope("nfe.tag.icms.l4"), settings: { foreground: p.icmsValor } },
 
     { name: 'ipi L0', scope: tagScope("nfe.tag.ipi.l0"), settings: { foreground: p.ipi, fontStyle: 'bold' } },
     { name: 'ipi L1', scope: tagScope("nfe.tag.ipi.l1"), settings: { foreground: p.ipiAliq } },
     { name: 'ipi L2', scope: tagScope("nfe.tag.ipi.l2"), settings: { foreground: p.ipiBase } },
     { name: 'ipi L3', scope: tagScope("nfe.tag.ipi.l3"), settings: { foreground: p.ipiValor } },
     { name: 'ipi L4', scope: tagScope("nfe.tag.ipi.l4"), settings: { foreground: p.ipiValor } },
 
     { name: 'pis L0', scope: tagScope("nfe.tag.pis.l0"), settings: { foreground: p.pis, fontStyle: 'bold' } },
     { name: 'pis L1', scope: tagScope("nfe.tag.pis.l1"), settings: { foreground: p.pisAliq } },
     { name: 'pis L2', scope: tagScope("nfe.tag.pis.l2"), settings: { foreground: p.pisBase } },
     { name: 'pis L3', scope: tagScope("nfe.tag.pis.l3"), settings: { foreground: p.pisValor } },
     { name: 'pis L4', scope: tagScope("nfe.tag.pis.l4"), settings: { foreground: p.pisValor } },
 
     { name: 'cofins L0', scope: tagScope("nfe.tag.cofins.l0"), settings: { foreground: p.cofins, fontStyle: 'bold' } },
     { name: 'cofins L1', scope: tagScope("nfe.tag.cofins.l1"), settings: { foreground: p.cofinsAliq } },
     { name: 'cofins L2', scope: tagScope("nfe.tag.cofins.l2"), settings: { foreground: p.cofinsBase } },
     { name: 'cofins L3', scope: tagScope("nfe.tag.cofins.l3"), settings: { foreground: p.cofinsValor } },
     { name: 'cofins L4', scope: tagScope("nfe.tag.cofins.l4"), settings: { foreground: p.cofinsValor } },
 
     { name: 'nfse L0', scope: tagScope("nfe.tag.nfse.l0"), settings: { foreground: p.root, fontStyle: 'bold' } },
     { name: 'nfse L1', scope: tagScope("nfe.tag.nfse.l1"), settings: { foreground: p.inf } },
     { name: 'nfse L2', scope: tagScope("nfe.tag.nfse.l2"), settings: { foreground: p.ide } },
     { name: 'nfse L3', scope: tagScope("nfe.tag.nfse.l3"), settings: { foreground: p.det } },
 
     { name: 'cte L0', scope: tagScope("nfe.tag.cte.l0"), settings: { foreground: p.inf, fontStyle: 'bold' } },
     { name: 'cte L1', scope: tagScope("nfe.tag.cte.l1"), settings: { foreground: p.ide } },

     //  Regras Específicas: NFS-e, CT-e, MDF-e 
     { name: 'NFS-e Serviço', scope: tagScope("nfe.tag.nfse.servico"), settings: { foreground: p.nfseServico, fontStyle: 'bold' } },
     { name: 'NFS-e Valores', scope: tagScope("nfe.tag.nfse.valores"), settings: { foreground: p.nfseValores, fontStyle: 'bold' } },
     { name: 'NFS-e Sujeito', scope: tagScope("nfe.tag.nfse.sujeito"), settings: { foreground: p.nfsePrestadorTomador, fontStyle: 'bold' } },
     
     { name: 'CT-e Carga', scope: tagScope("nfe.tag.cte.carga"), settings: { foreground: p.cteCarga, fontStyle: 'bold' } },
     { name: 'CT-e Modal', scope: tagScope("nfe.tag.cte.modal"), settings: { foreground: p.cteModal, fontStyle: 'bold' } },
     { name: 'MDF-e Veículo', scope: tagScope("nfe.tag.mdfe.veiculo"), settings: { foreground: p.mdfeVeiculo, fontStyle: 'bold' } },
   ];
 }
function buildEditorColors(p: Palette): Record<string, string> {
  return {
    'editor.background': p.bg,
    'editor.foreground': p.fg,
    'editor.lineHighlightBackground': p.bgLine,
    'editor.selectionBackground': p.bgSelection,
    'editorCursor.foreground': p.fg,
    'editorIndentGuide.background': p.bgLine,
    'editorIndentGuide.activeBackground': p.fg,    'editorWhitespace.foreground': p.punct,    'editor.selectionHighlightBackground': p.bgSelection,
    'editor.lineHighlightBorder': p.bgLine,
  };
}

export const ALL_THEMES: Array<{ filename: string; theme: VsCodeTheme }> = [
  { filename: 'nfe-dark.json',  theme: buildTheme('nfe',  'NF-e Dark Theme')  },
  { filename: 'nfe-harmonic-dark.json', theme: buildTheme('nfeHarmonic', 'NF-e Harmonic Theme') },
  { filename: 'nfce-dark.json', theme: buildTheme('nfce', 'NFC-e Dark Theme') },
  { filename: 'cte-dark.json',  theme: buildTheme('cte',  'CT-e Dark Theme')  },
  { filename: 'nfse-dark.json', theme: buildTheme('nfse', 'NFS-e Dark Theme') },
  { filename: 'mdfe-dark.json', theme: buildTheme('mdfe', 'MDF-e Dark Theme') },
];

function buildTheme(paletteId: keyof typeof PALETTES, themeName: string): VsCodeTheme {
  const palette = PALETTES[paletteId];
  if (!palette) {
    throw new Error(`Unknown palette: ${paletteId}`);
  }

  return {
    name: themeName,
    type: 'dark',
    colors: buildEditorColors(palette),
    tokenColors: buildTokenColors(palette),
  };
}