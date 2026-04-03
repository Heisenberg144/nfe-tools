"use strict";
/**
 * Gerador de temas de cor para NFe Tools.
 * Cada modelo tem uma paleta própria com cor base + degradês por bloco + fade nas tags.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_THEMES = void 0;
exports.buildTheme = buildTheme;
const PALETTES = {
    // ─── NF-e: Verde esmeralda ────────────────────────────────────────────────
    nfe: {
        bg: '#0a0f0d',
        bgLine: '#111a14',
        bgSelection: '#1a3a22',
        fg: '#c8d8cc',
        root: '#00E676', // verde vibrante
        inf: '#69F0AE',
        ide: '#40C4FF', // azul identificação
        emitDest: '#80D8FF',
        det: '#FFAB40', // laranja produtos
        prod: '#FFD180',
        imposto: '#00BFA5', // teal impostos (bloco pai)
        icms: '#1DE9B6', // verde-teal ICMS
        icmsAliq: '#64FFDA',
        icmsBase: '#A7FFEB',
        icmsValor: '#B9FFF8',
        ipi: '#7C4DFF', // roxo IPI
        ipiAliq: '#B388FF',
        ipiBase: '#CFB8FF',
        ipiValor: '#E1D5FF',
        pis: '#00E5FF', // ciano PIS
        pisAliq: '#84FFFF',
        pisBase: '#B2FFFF',
        pisValor: '#CCFFFF',
        cofins: '#FFD600', // amarelo COFINS
        cofinsAliq: '#FFE57F',
        cofinsBase: '#FFF3BF',
        cofinsValor: '#FFFDE7',
        total: '#69F0AE',
        valorTotal: '#00FF6A',
        transp: '#78909C',
        cob: '#90A4AE',
        infAdic: '#546E7A',
        prot: '#26A69A',
        chaveAcesso: '#00E5FF',
        cnpj: '#FFCA28',
        cpf: '#FFA726',
        numero: '#E0E0E0',
        cfop: '#FF6E40',
        cst: '#FF9E80',
        data: '#80CBC4',
        tagGeneric: '#37474F',
        tagSupport: '#455A64',
        attrName: '#78909C',
        attrValue: '#546E7A',
        comment: '#2E4A3A',
    },
    // ─── NFC-e: Ciano elétrico ────────────────────────────────────────────────
    nfce: {
        bg: '#08100f',
        bgLine: '#0e1a1a',
        bgSelection: '#0d3030',
        fg: '#c0d8d8',
        root: '#00E5FF',
        inf: '#84FFFF',
        ide: '#64FFDA',
        emitDest: '#A7FFEB',
        det: '#FF6D00',
        prod: '#FF9E40',
        imposto: '#00BCD4',
        icms: '#00E5FF',
        icmsAliq: '#80DEEA',
        icmsBase: '#B2EBF2',
        icmsValor: '#E0F7FA',
        ipi: '#AA00FF',
        ipiAliq: '#EA80FC',
        ipiBase: '#F3CBFF',
        ipiValor: '#F8E8FF',
        pis: '#76FF03',
        pisAliq: '#CCFF90',
        pisBase: '#E8FFD0',
        pisValor: '#F1FFE8',
        cofins: '#FFD740',
        cofinsAliq: '#FFE57F',
        cofinsBase: '#FFF8D6',
        cofinsValor: '#FFFDE7',
        total: '#84FFFF',
        valorTotal: '#00E5FF',
        transp: '#607D8B',
        cob: '#78909C',
        infAdic: '#546E7A',
        prot: '#00ACC1',
        chaveAcesso: '#18FFFF',
        cnpj: '#FFD740',
        cpf: '#FFAB40',
        numero: '#E0E0E0',
        cfop: '#FF6E40',
        cst: '#FF9E80',
        data: '#80DEEA',
        tagGeneric: '#2C3E3F',
        tagSupport: '#37474F',
        attrName: '#546E7A',
        attrValue: '#455A64',
        comment: '#1A3535',
    },
    // ─── CT-e: Âmbar/dourado ─────────────────────────────────────────────────
    cte: {
        bg: '#100e00',
        bgLine: '#1a1700',
        bgSelection: '#332800',
        fg: '#d8d0b8',
        root: '#FFD600',
        inf: '#FFE57F',
        ide: '#FF6D00',
        emitDest: '#FF9E40',
        det: '#76FF03',
        prod: '#CCFF90',
        imposto: '#FFC400',
        icms: '#FFD740',
        icmsAliq: '#FFE57F',
        icmsBase: '#FFF3BF',
        icmsValor: '#FFFDE7',
        ipi: '#E040FB',
        ipiAliq: '#F48FB1',
        ipiBase: '#FCE4EC',
        ipiValor: '#FDE8F8',
        pis: '#40C4FF',
        pisAliq: '#B3E5FC',
        pisBase: '#E1F5FE',
        pisValor: '#EDF8FF',
        cofins: '#69F0AE',
        cofinsAliq: '#B9F6CA',
        cofinsBase: '#DFFFF0',
        cofinsValor: '#F1FFF7',
        total: '#FFE57F',
        valorTotal: '#FFD600',
        transp: '#FF8F00',
        cob: '#FFA000',
        infAdic: '#795548',
        prot: '#FF8F00',
        chaveAcesso: '#FFEA00',
        cnpj: '#FF6D00',
        cpf: '#FF9E40',
        numero: '#E0E0E0',
        cfop: '#40C4FF',
        cst: '#80D8FF',
        data: '#FFD54F',
        tagGeneric: '#3E3000',
        tagSupport: '#4A3A00',
        attrName: '#6D5700',
        attrValue: '#5C4A00',
        comment: '#332800',
    },
    // ─── NFS-e: Roxo violeta ─────────────────────────────────────────────────
    nfse: {
        bg: '#0d0a14',
        bgLine: '#160f22',
        bgSelection: '#2a1a44',
        fg: '#ccc0d8',
        root: '#EA80FC',
        inf: '#CE93D8',
        ide: '#80D8FF',
        emitDest: '#B3E5FC',
        det: '#CCFF90',
        prod: '#E8FFD0',
        imposto: '#7C4DFF',
        icms: '#B388FF',
        icmsAliq: '#CFB8FF',
        icmsBase: '#E1D5FF',
        icmsValor: '#EDE7FF',
        ipi: '#EA80FC',
        ipiAliq: '#F3ABFF',
        ipiBase: '#F9D8FF',
        ipiValor: '#FCF0FF',
        pis: '#40C4FF',
        pisAliq: '#B3E5FC',
        pisBase: '#E1F5FE',
        pisValor: '#EDF8FF',
        cofins: '#69F0AE',
        cofinsAliq: '#B9F6CA',
        cofinsBase: '#E0FFF0',
        cofinsValor: '#F1FFF7',
        total: '#CE93D8',
        valorTotal: '#EA80FC',
        transp: '#9575CD',
        cob: '#AB47BC',
        infAdic: '#7B1FA2',
        prot: '#8E24AA',
        chaveAcesso: '#E040FB',
        cnpj: '#FFCA28',
        cpf: '#FFA726',
        numero: '#E0E0E0',
        cfop: '#FF8A65',
        cst: '#FFAB91',
        data: '#CE93D8',
        tagGeneric: '#2A1A44',
        tagSupport: '#351F55',
        attrName: '#4A3066',
        attrValue: '#3D2660',
        comment: '#220F38',
    },
    // ─── MDF-e: Laranja intenso ───────────────────────────────────────────────
    mdfe: {
        bg: '#100700',
        bgLine: '#1a0e00',
        bgSelection: '#331a00',
        fg: '#d8c8b8',
        root: '#FF6D00',
        inf: '#FF9E40',
        ide: '#FFCA28',
        emitDest: '#FFE082',
        det: '#69F0AE',
        prod: '#B9F6CA',
        imposto: '#FF3D00',
        icms: '#FF6E40',
        icmsAliq: '#FF9E80',
        icmsBase: '#FFCCBC',
        icmsValor: '#FBE9E7',
        ipi: '#D500F9',
        ipiAliq: '#EA80FC',
        ipiBase: '#F3CBFF',
        ipiValor: '#F8E8FF',
        pis: '#00E5FF',
        pisAliq: '#84FFFF',
        pisBase: '#CCFFFF',
        pisValor: '#E8FFFF',
        cofins: '#76FF03',
        cofinsAliq: '#CCFF90',
        cofinsBase: '#E8FFCF',
        cofinsValor: '#F3FFE8',
        total: '#FF9E40',
        valorTotal: '#FF6D00',
        transp: '#BF360C',
        cob: '#D84315',
        infAdic: '#6D4C41',
        prot: '#E64A19',
        chaveAcesso: '#FF9100',
        cnpj: '#FFCA28',
        cpf: '#FFB300',
        numero: '#E0E0E0',
        cfop: '#40C4FF',
        cst: '#80D8FF',
        data: '#FFAB40',
        tagGeneric: '#2C1500',
        tagSupport: '#3E1F00',
        attrName: '#5C3317',
        attrValue: '#4A2800',
        comment: '#2C1500',
    },
};
// ─── Construtor de tokenColors ────────────────────────────────────────────────
function buildTokenColors(p) {
    return [
        // ── Declaração XML e comentários ──────────────────────────────────────
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
        // ── Estrutura raiz ────────────────────────────────────────────────────
        {
            name: '🔷 Raiz — nfeProc / NFe / cteProc',
            scope: 'entity.name.block.root.nfe',
            settings: { foreground: p.root, fontStyle: 'bold' },
        },
        {
            name: '🔷 infNFe / infCte',
            scope: 'entity.name.block.inf.nfe',
            settings: { foreground: p.inf, fontStyle: 'bold' },
        },
        // ── Identificação ────────────────────────────────────────────────────
        {
            name: '🔵 Bloco ide',
            scope: 'entity.name.block.ide.nfe',
            settings: { foreground: p.ide, fontStyle: 'bold' },
        },
        {
            name: '🔵 Número da nota',
            scope: 'constant.numeric.numero.nfe',
            settings: { foreground: p.numero, fontStyle: 'bold' },
        },
        {
            name: '🔵 Modelo / Série',
            scope: ['support.type.modelo.nfe', 'support.type.serie.nfe'],
            settings: { foreground: p.ide },
        },
        {
            name: '🔵 Tipo / perfil',
            scope: 'constant.tipo_perfil.nfe',
            settings: { foreground: p.ide },
        },
        {
            name: '📅 Datas',
            scope: ['constant.language.date.nfe', 'constant.language.datetime.nfe'],
            settings: { foreground: p.data },
        },
        // ── Emitente / Destinatário ───────────────────────────────────────────
        {
            name: '🏢 Bloco emit/dest',
            scope: 'entity.name.block.emitdest.nfe',
            settings: { foreground: p.emitDest, fontStyle: 'bold' },
        },
        {
            name: '🏢 Nome / Fantasia',
            scope: 'entity.name.section.nfe',
            settings: { foreground: p.emitDest },
        },
        {
            name: '🪪 CNPJ',
            scope: 'entity.name.cnpj.nfe',
            settings: { foreground: p.cnpj, fontStyle: 'bold' },
        },
        {
            name: '🪪 CPF',
            scope: 'entity.name.cpf.nfe',
            settings: { foreground: p.cpf, fontStyle: 'bold' },
        },
        {
            name: '🪪 IE / CRT',
            scope: 'constant.numeric.ie.nfe',
            settings: { foreground: p.cnpj },
        },
        {
            name: '📍 Endereço',
            scope: 'entity.name.item.nfe',
            settings: { foreground: p.emitDest },
        },
        // ── Chave de acesso ───────────────────────────────────────────────────
        {
            name: '🔑 Chave de acesso',
            scope: 'entity.name.chave.nfe',
            settings: { foreground: p.chaveAcesso, fontStyle: 'bold underline' },
        },
        // ── Produtos / Itens ──────────────────────────────────────────────────
        {
            name: '📦 Bloco det',
            scope: 'entity.name.block.det.nfe',
            settings: { foreground: p.det, fontStyle: 'bold' },
        },
        {
            name: '📦 Bloco prod',
            scope: 'entity.name.block.prod.nfe',
            settings: { foreground: p.prod, fontStyle: 'bold' },
        },
        {
            name: '📦 Descrição produto',
            scope: 'entity.name.record.nfe',
            settings: { foreground: p.prod },
        },
        {
            name: '📦 Qtd / Valor unit',
            scope: 'constant.numeric.valuenf55.nfe',
            settings: { foreground: p.prod },
        },
        {
            name: '📋 CFOP',
            scope: 'constant.numeric.cfop.nfe',
            settings: { foreground: p.cfop, fontStyle: 'bold' },
        },
        {
            name: '📋 CST / CSOSN',
            scope: 'constant.numeric.cst.nfe',
            settings: { foreground: p.cst },
        },
        // ── IMPOSTOS — bloco pai ──────────────────────────────────────────────
        {
            name: '💰 Bloco imposto (pai)',
            scope: 'entity.name.block.imposto.nfe',
            settings: { foreground: p.imposto, fontStyle: 'bold' },
        },
        // ── ICMS ──────────────────────────────────────────────────────────────
        {
            name: '🟢 ICMS — bloco',
            scope: 'entity.name.block.icms.nfe',
            settings: { foreground: p.icms, fontStyle: 'bold' },
        },
        {
            name: '🟢 ICMS — alíquota',
            scope: 'tax.icms.aliquota.nfe',
            settings: { foreground: p.icmsAliq },
        },
        {
            name: '🟢 ICMS — base de cálculo',
            scope: 'tax.icms.base.nfe',
            settings: { foreground: p.icmsBase },
        },
        {
            name: '🟢 ICMS — valor',
            scope: 'tax.icms.valor.nfe',
            settings: { foreground: p.icmsValor, fontStyle: 'bold' },
        },
        // ── IPI ───────────────────────────────────────────────────────────────
        {
            name: '🟣 IPI — bloco',
            scope: 'entity.name.block.ipi.nfe',
            settings: { foreground: p.ipi, fontStyle: 'bold' },
        },
        {
            name: '🟣 IPI — alíquota',
            scope: 'tax.ipi.aliquota.nfe',
            settings: { foreground: p.ipiAliq },
        },
        {
            name: '🟣 IPI — base',
            scope: 'tax.ipi.base.nfe',
            settings: { foreground: p.ipiBase },
        },
        {
            name: '🟣 IPI — valor',
            scope: 'tax.ipi.valor.nfe',
            settings: { foreground: p.ipiValor, fontStyle: 'bold' },
        },
        // ── PIS ───────────────────────────────────────────────────────────────
        {
            name: '🔵 PIS — bloco',
            scope: 'entity.name.block.pis.nfe',
            settings: { foreground: p.pis, fontStyle: 'bold' },
        },
        {
            name: '🔵 PIS — alíquota',
            scope: 'tax.pis.aliquota.nfe',
            settings: { foreground: p.pisAliq },
        },
        {
            name: '🔵 PIS — base',
            scope: 'tax.pis.base.nfe',
            settings: { foreground: p.pisBase },
        },
        {
            name: '🔵 PIS — valor',
            scope: 'tax.pis.valor.nfe',
            settings: { foreground: p.pisValor, fontStyle: 'bold' },
        },
        // ── COFINS ────────────────────────────────────────────────────────────
        {
            name: '🟡 COFINS — bloco',
            scope: 'entity.name.block.cofins.nfe',
            settings: { foreground: p.cofins, fontStyle: 'bold' },
        },
        {
            name: '🟡 COFINS — alíquota',
            scope: 'tax.cofins.aliquota.nfe',
            settings: { foreground: p.cofinsAliq },
        },
        {
            name: '🟡 COFINS — base',
            scope: 'tax.cofins.base.nfe',
            settings: { foreground: p.cofinsBase },
        },
        {
            name: '🟡 COFINS — valor',
            scope: 'tax.cofins.valor.nfe',
            settings: { foreground: p.cofinsValor, fontStyle: 'bold' },
        },
        // ── Totais ────────────────────────────────────────────────────────────
        {
            name: '💵 Bloco total / ICMSTot',
            scope: 'entity.name.block.total.nfe',
            settings: { foreground: p.total, fontStyle: 'bold' },
        },
        {
            name: '💵 Valor total da NF',
            scope: 'constant.numeric.value.nfe',
            settings: { foreground: p.valorTotal, fontStyle: 'bold underline' },
        },
        // ── Transporte ────────────────────────────────────────────────────────
        {
            name: '🚛 Bloco transp',
            scope: 'entity.name.block.transp.nfe',
            settings: { foreground: p.transp, fontStyle: 'bold' },
        },
        // ── Cobrança / Pagamento ──────────────────────────────────────────────
        {
            name: '💳 Bloco cobr / pag',
            scope: 'entity.name.block.cob.nfe',
            settings: { foreground: p.cob, fontStyle: 'bold' },
        },
        // ── Informações adicionais ────────────────────────────────────────────
        {
            name: '📝 Bloco infAdic',
            scope: 'entity.name.block.infadic.nfe',
            settings: { foreground: p.infAdic, fontStyle: 'bold' },
        },
        {
            name: '📝 Texto infAdic',
            scope: 'comment.block.infadic.nfe',
            settings: { foreground: p.infAdic, fontStyle: 'italic' },
        },
        // ── Protocolo ─────────────────────────────────────────────────────────
        {
            name: '🔐 Bloco protNFe',
            scope: 'entity.name.block.prot.nfe',
            settings: { foreground: p.prot, fontStyle: 'bold' },
        },
        {
            name: '🔐 nProt / dhRecbto',
            scope: 'entity.name.control.nfe',
            settings: { foreground: p.prot },
        },
        // ── NFS-e ─────────────────────────────────────────────────────────────
        {
            name: '🟣 NFS-e bloco',
            scope: 'entity.name.block.nfse.nfe',
            settings: { foreground: p.root, fontStyle: 'bold' },
        },
        // ── CT-e específico ───────────────────────────────────────────────────
        {
            name: '🟡 CT-e bloco',
            scope: 'entity.name.block.cte.nfe',
            settings: { foreground: p.inf, fontStyle: 'bold' },
        },
        // ── Tags genéricas e suporte ──────────────────────────────────────────
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
        // ── Atributos XML ─────────────────────────────────────────────────────
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
    ];
}
function buildEditorColors(p) {
    return {
        'editor.background': p.bg,
        'editor.foreground': p.fg,
        'editor.lineHighlightBackground': p.bgLine,
        'editor.selectionBackground': p.bgSelection,
        'editor.selectionHighlightBackground': p.bgSelection + '88',
        'editorLineNumber.foreground': p.tagGeneric,
        'editorLineNumber.activeForeground': p.tagSupport,
        'editorCursor.foreground': p.root,
        'editorBracketMatch.background': p.bgSelection,
        'editorBracketMatch.border': p.root + '88',
        'editorIndentGuide.background': p.tagGeneric + '44',
        'editorIndentGuide.activeBackground': p.tagSupport + '66',
        'activityBar.background': p.bg,
        'activityBar.foreground': p.root,
        'sideBar.background': p.bgLine,
        'sideBarTitle.foreground': p.fg,
        'statusBar.background': p.root + '22',
        'statusBar.foreground': p.root,
        'titleBar.activeBackground': p.bg,
        'titleBar.activeForeground': p.fg,
    };
}
// ─── Exportação dos temas ─────────────────────────────────────────────────────
function buildTheme(model, name) {
    const p = PALETTES[model];
    return {
        name,
        type: 'dark',
        colors: buildEditorColors(p),
        tokenColors: buildTokenColors(p),
    };
}
exports.ALL_THEMES = [
    { filename: 'nfe-dark.json', theme: buildTheme('nfe', 'NFe Fiscal Pro — NF-e Dark') },
    { filename: 'nfce-dark.json', theme: buildTheme('nfce', 'NFe Fiscal Pro — NFC-e Dark') },
    { filename: 'cte-dark.json', theme: buildTheme('cte', 'NFe Fiscal Pro — CT-e Dark') },
    { filename: 'nfse-dark.json', theme: buildTheme('nfse', 'NFe Fiscal Pro — NFS-e Dark') },
    { filename: 'mdfe-dark.json', theme: buildTheme('mdfe', 'NFe Fiscal Pro — MDF-e Dark') },
];
//# sourceMappingURL=themeBuilder.js.map