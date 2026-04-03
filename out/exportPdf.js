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
exports.exportPdfCommand = exportPdfCommand;
const vscode = __importStar(require("vscode"));
const modelDetector_1 = require("./detector/modelDetector");
async function exportPdfCommand() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('Nenhum arquivo XML aberto para exportar.');
        return;
    }
    const document = editor.document;
    const text = document.getText();
    const detection = (0, modelDetector_1.detectFiscalModel)(text);
    if (detection.model === 'unknown') {
        vscode.window.showWarningMessage('Não foi possível identificar o modelo do XML aberto.');
        return;
    }
    const config = vscode.workspace.getConfiguration('nfe-tools');
    const apiProvider = config.get('apiProvider');
    const apiToken = config.get('apiToken');
    if (apiProvider && apiProvider !== 'Nenhum (Portais Públicos)' && apiToken) {
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `NFe Tools: Solicitando PDF via ${apiProvider}...`,
            cancellable: false
        }, async () => {
            try {
                // Em uma implementação real final, aqui você envia o XML em Base64 ou string para o endpoint da sua API.
                // Ex: const res = await fetch('https://api.nuvemfiscal.com.br/nfe/danfe', { method: 'POST', body: ... })
                // Simulação
                await new Promise(resolve => setTimeout(resolve, 1500));
                vscode.window.showInformationMessage(`A geração de PDF via ${apiProvider} estará disponível na próxima atualização de API!`);
            }
            catch (err) {
                vscode.window.showErrorMessage(`Falha ao converter PDF: ${err.message}`);
            }
        });
    }
    else {
        // Fallback Gratuito: Copia o XML para a área de transferência e redireciona
        const choice = await vscode.window.showInformationMessage('Para gerar o PDF (DANFE/DACTE) gratuitamente, o XML será copiado e redirecionaremos você para o portal DANFE Online.', 'Gerar PDF no Navegador');
        if (choice === 'Gerar PDF no Navegador') {
            await vscode.env.clipboard.writeText(text);
            vscode.env.openExternal(vscode.Uri.parse('https://www.danfeonline.com.br/'));
        }
    }
}
//# sourceMappingURL=exportPdf.js.map