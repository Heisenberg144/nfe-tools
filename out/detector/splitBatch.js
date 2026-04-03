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
exports.splitBatchCommand = splitBatchCommand;
const vscode = __importStar(require("vscode"));
async function splitBatchCommand() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('Nenhum arquivo XML aberto para desmembrar.');
        return;
    }
    const text = editor.document.getText();
    // Busca por blocos fechados independentes de NF-e, CT-e, MDF-e ou NFS-e
    // A ordem importa: se houver um <nfeProc> envolvendo a <NFe>, ele pega o pacote inteiro e não duplica.
    const regex = /<nfeProc[\s\S]*?<\/nfeProc>|<cteProc[\s\S]*?<\/cteProc>|<CompNfse[\s\S]*?<\/CompNfse>|<NFe\b[\s\S]*?<\/NFe>|<CTe\b[\s\S]*?<\/CTe>/gi;
    const matches = text.match(regex);
    if (!matches || matches.length <= 1) {
        vscode.window.showInformationMessage('Este arquivo não parece ser um lote contendo múltiplas notas.');
        return;
    }
    const folderUri = await vscode.window.showOpenDialog({
        canSelectFolders: true,
        canSelectFiles: false,
        canSelectMany: false,
        title: 'Selecione a pasta para salvar as notas extraídas',
        openLabel: 'Extrair Notas Aqui'
    });
    if (!folderUri || folderUri.length === 0)
        return;
    const targetFolder = folderUri[0];
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `NFe Tools: Extraindo ${matches.length} notas...`,
        cancellable: false
    }, async () => {
        let count = 0;
        for (let i = 0; i < matches.length; i++) {
            const noteXml = matches[i];
            // Tenta extrair a chave de acesso ou número para dar nome ao arquivo
            let fileName = `Nota_Extraida_${i + 1}.xml`;
            const chaveMatch = noteXml.match(/<chNFe>(\d{44})<\/chNFe>|<chCTe>(\d{44})<\/chCTe>|Id="(?:NFe|CTe)?(\d{44})"/);
            if (chaveMatch) {
                const chave = chaveMatch[1] || chaveMatch[2] || chaveMatch[3];
                if (chave)
                    fileName = `${chave}.xml`;
            }
            // Garante que todo arquivo extraído comece com uma declaração XML válida
            const finalXml = noteXml.startsWith('<?xml') ? noteXml : `<?xml version="1.0" encoding="UTF-8"?>\n${noteXml}`;
            await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(targetFolder, fileName), new TextEncoder().encode(finalXml));
            count++;
        }
        vscode.window.showInformationMessage(`✅ Sucesso! ${count} notas foram extraídas e salvas separadamente.`);
    });
}
//# sourceMappingURL=splitBatch.js.map