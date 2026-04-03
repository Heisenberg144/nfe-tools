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
exports.openViewer = openViewer;
const vscode = __importStar(require("vscode"));
const modelDetector_1 = require("./detector/modelDetector");
async function openViewer(context) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('Nenhum arquivo XML aberto para visualizar.');
        return;
    }
    const doc = editor.document;
    const content = doc.getText();
    if (!content.trim()) {
        vscode.window.showErrorMessage('O arquivo XML está vazio.');
        return;
    }
    const detection = (0, modelDetector_1.detectFiscalModel)(content);
    if (detection.model !== 'nfe' && detection.model !== 'nfce') {
        vscode.window.showInformationMessage(`A visualização em Webview ainda não está disponível para o modelo ${detection.label}.`);
        return;
    }
    // Cria a aba do Webview ao lado (Beside)
    const panel = vscode.window.createWebviewPanel('nfeViewer', `DANFE Resumo - ${detection.label}`, vscode.ViewColumn.Beside, { enableScripts: true });
    // Função simples para extrair tags usando RegEx
    const extract = (tag) => {
        const match = content.match(new RegExp(`<${tag}[^>]*>([^<]+)</${tag}>`));
        return match ? match[1] : 'N/A';
    };
    const natOp = extract('natOp');
    const nNF = extract('nNF');
    const serie = extract('serie');
    const dhEmi = extract('dhEmi').split('T')[0]; // Pega só a data
    const vNF = extract('vNF');
    // Extração específica de blocos (Emitente e Destinatário)
    const emitNome = content.match(/<emit>[\s\S]*?<xNome>([^<]+)<\/xNome>[\s\S]*?<\/emit>/)?.[1] || 'N/A';
    const emitCNPJ = content.match(/<emit>[\s\S]*?<CNPJ>([^<]+)<\/CNPJ>[\s\S]*?<\/emit>/)?.[1] || 'N/A';
    const destNome = content.match(/<dest>[\s\S]*?<xNome>([^<]+)<\/xNome>[\s\S]*?<\/dest>/)?.[1] || 'N/A';
    const destDoc = content.match(/<dest>[\s\S]*?(?:<CNPJ>|<CPF>)([^<]+)<\/(?:CNPJ|CPF)>[\s\S]*?<\/dest>/)?.[1] || 'N/A';
    // Extração dos Itens da Nota
    const detMatches = content.match(/<det[^>]*>[\s\S]*?<\/det>/g) || [];
    const itens = detMatches.map(det => {
        const extractDet = (tag) => det.match(new RegExp(`<${tag}[^>]*>([^<]+)</${tag}>`))?.[1] || '';
        return {
            cProd: extractDet('cProd'),
            xProd: extractDet('xProd'),
            ncm: extractDet('NCM'),
            cfop: extractDet('CFOP'),
            qCom: extractDet('qCom'),
            vUnCom: extractDet('vUnCom'),
            vProd: extractDet('vProd')
        };
    });
    panel.webview.html = getWebviewContent({
        natOp, nNF, serie, dhEmi, vNF, emitNome, emitCNPJ, destNome, destDoc, itens
    });
}
function getWebviewContent(data) {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DANFE Resumo</title>
  <style>
    body {
      font-family: var(--vscode-font-family), sans-serif;
      padding: 20px;
      color: var(--vscode-editor-foreground);
      background-color: var(--vscode-editor-background);
    }
    .header {
      text-align: center;
      border-bottom: 1px solid var(--vscode-panel-border);
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .section {
      background-color: var(--vscode-editorWidget-background);
      border: 1px solid var(--vscode-panel-border);
      border-radius: 6px;
      padding: 15px;
      margin-bottom: 20px;
    }
    .section h2 {
      margin-top: 0;
      font-size: 1.1em;
      color: var(--vscode-textLink-foreground);
      border-bottom: 1px dashed var(--vscode-panel-border);
      padding-bottom: 5px;
    }
    .row { display: flex; flex-wrap: wrap; gap: 20px; }
    .field { flex: 1; min-width: 150px; }
    .field strong {
      display: block;
      font-size: 0.8em;
      text-transform: uppercase;
      color: var(--vscode-descriptionForeground);
      margin-bottom: 4px;
    }
    .field span { font-size: 1.1em; font-weight: 500; }
    .destaque { color: var(--vscode-charts-green); font-size: 1.3em !important; font-weight: bold; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th, td { border: 1px solid var(--vscode-panel-border); padding: 8px; text-align: left; }
    th { background-color: var(--vscode-editor-inactiveSelectionBackground); color: var(--vscode-editor-foreground); font-size: 0.9em; font-weight: bold; }
    td { font-size: 0.85em; }
  </style>
</head>
<body>
  <div class="header">
    <h2>Documento Auxiliar da Nota Fiscal Eletrônica</h2>
    <p>${data.natOp}</p>
  </div>
  <div class="section"><h2>Dados da NF-e</h2><div class="row"><div class="field"><strong>Número</strong><span>${data.nNF}</span></div><div class="field"><strong>Série</strong><span>${data.serie}</span></div><div class="field"><strong>Data de Emissão</strong><span>${data.dhEmi}</span></div><div class="field"><strong>Valor Total</strong><span class="destaque">R$ ${data.vNF}</span></div></div></div>
  <div class="section"><h2>Emitente</h2><div class="row"><div class="field"><strong>Razão Social</strong><span>${data.emitNome}</span></div><div class="field"><strong>CNPJ</strong><span>${data.emitCNPJ}</span></div></div></div>
  <div class="section"><h2>Destinatário</h2><div class="row"><div class="field"><strong>Razão Social</strong><span>${data.destNome}</span></div><div class="field"><strong>Documento (CNPJ/CPF)</strong><span>${data.destDoc}</span></div></div></div>
  
  <div class="section">
    <h2>Itens da Nota</h2>
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Descrição</th>
          <th>NCM</th>
          <th>CFOP</th>
          <th>Qtd.</th>
          <th>V. Unitário</th>
          <th>V. Total</th>
        </tr>
      </thead>
      <tbody>
        ${data.itens.length > 0 ? data.itens.map((item) => `
          <tr>
            <td>${item.cProd}</td><td>${item.xProd}</td><td>${item.ncm}</td><td>${item.cfop}</td><td>${item.qCom}</td><td>R$ ${item.vUnCom}</td><td>R$ ${item.vProd}</td>
          </tr>
        `).join('') : '<tr><td colspan="7" style="text-align: center;">Nenhum item encontrado</td></tr>'}
      </tbody>
    </table>
  </div>
</body>
</html>`;
}
//# sourceMappingURL=openViewer.js.map