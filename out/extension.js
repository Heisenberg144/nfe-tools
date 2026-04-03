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
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const modelDetector_1 = require("./detector/modelDetector");
const hoverProvider_1 = require("./hover/hoverProvider");
const downloadXml_1 = require("./downloadXml");
const openViewer_1 = require("./openViewer");
const toolsTreeProvider_1 = require("./toolsTreeProvider");
const formatXml_1 = require("./formatXml");
const validateXml_1 = require("./validateXml");
const exportPdf_1 = require("./exportPdf");
const splitBatch_1 = require("./detector/splitBatch");
// Cache simples para evitar notificações repetidas na mesma sessão
const context_cache = new Set();
//  Ativação da extensão 
function activate(context) {
    console.log('NFe Tools: ativado');
    // 1. Ao abrir qualquer XML, detecta e troca linguagem + tema
    context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(doc => handleXmlDocument(doc)), vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor)
            handleXmlDocument(editor.document);
    }));
    // 2. Se já tiver arquivo XML aberto ao ativar
    if (vscode.window.activeTextEditor) {
        handleXmlDocument(vscode.window.activeTextEditor.document);
    }
    // 3. Hover providers para todos os modelos fiscais
    const fiscalLangs = ['nfe', 'nfce', 'cte', 'nfse', 'mdfe', 'nfcom'];
    for (const lang of fiscalLangs) {
        context.subscriptions.push(vscode.languages.registerHoverProvider({ language: lang }, new hoverProvider_1.NfeHoverProvider()));
    }
    // 4. Comando manual
    context.subscriptions.push(vscode.commands.registerCommand('nfe-tools.openViewer', () => {
        (0, openViewer_1.openViewer)(context);
    }));
    // Comando de Formatação
    context.subscriptions.push(vscode.commands.registerCommand('nfe-tools.formatXml', () => {
        (0, formatXml_1.formatXmlCommand)();
    }));
    // Comando de Validação
    context.subscriptions.push(vscode.commands.registerCommand('nfe-tools.validateXml', () => {
        (0, validateXml_1.validateXmlCommand)();
    }));
    // Comando de Desmembrar Lotes
    context.subscriptions.push(vscode.commands.registerCommand('nfe-tools.splitBatch', () => {
        (0, splitBatch_1.splitBatchCommand)();
    }));
    // Comando de Exportar PDF
    context.subscriptions.push(vscode.commands.registerCommand('nfe-tools.exportPdf', () => {
        (0, exportPdf_1.exportPdfCommand)();
    }));
    // 5. Comando de Download via Chave de Acesso
    context.subscriptions.push(vscode.commands.registerCommand('nfe-tools.downloadXml', () => (0, downloadXml_1.promptAndDownloadXml)()));
    // 6. Barra Lateral de Ferramentas (TreeView)
    const toolsProvider = new toolsTreeProvider_1.ToolsTreeProvider();
    vscode.window.registerTreeDataProvider('nfe-tools-menu', toolsProvider);
}
function deactivate() { }
//  Lógica de detecção e troca 
async function handleXmlDocument(doc, forceNotify = false) {
    // Só processa XML
    if (!doc.fileName.endsWith('.xml') && doc.languageId !== 'xml')
        return;
    const content = doc.getText();
    if (!content.trim())
        return;
    const result = (0, modelDetector_1.detectFiscalModel)(content);
    if (result.model === 'unknown')
        return;
    // Troca a linguagem do arquivo para ativar a grammar correta
    if (doc.languageId !== result.languageId) {
        await vscode.languages.setTextDocumentLanguage(doc, result.languageId);
    }
    // Aplica o tema de cor correspondente
    await applyTheme(result.themeId);
    // Notificação discreta (apenas na primeira detecção ou quando forçado)
    const key = `nfe-tools.notified.${doc.fileName}`;
    const alreadyNotified = context_cache.has(key);
    if (!alreadyNotified || forceNotify) {
        context_cache.add(key);
        vscode.window.setStatusBarMessage(`$(symbol-file) NFe Tools: ${result.label} detectado (via ${result.detectedBy})`, 5000);
    }
}
async function applyTheme(themeId) {
    const config = vscode.workspace.getConfiguration('workbench');
    const current = config.get('colorTheme');
    if (current === themeId)
        return;
    await config.update('workbench.colorTheme', themeId, vscode.ConfigurationTarget.Global);
}
//# sourceMappingURL=extension.js.map