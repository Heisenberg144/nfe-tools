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
exports.formatXmlCommand = formatXmlCommand;
const vscode = __importStar(require("vscode"));
async function formatXmlCommand() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('Nenhum arquivo aberto para formatar.');
        return;
    }
    const document = editor.document;
    const text = document.getText();
    try {
        let formatted = '';
        // Remove espaços vazios entre as tags para padronizar
        let xml = text.replace(/>\s+</g, '><');
        // Adiciona quebra de linha entre todas as tags
        xml = xml.replace(/(>)(<)(\/*)/g, '$1\n$2$3');
        let pad = 0;
        xml.split('\n').forEach((node) => {
            let indent = 0;
            if (node.match(/.+<\/[\w:][^>]*>$/)) {
                indent = 0; // Tag de fechamento na mesma linha (ex: <tag>valor</tag>)
            }
            else if (node.match(/^<\/[\w:]/)) {
                if (pad !== 0)
                    pad -= 1; // Tag de fechamento isolada (diminui recuo)
            }
            else if (node.match(/^<[\w:][^>]*[^\/]>.*$/)) {
                indent = 1; // Nova tag de abertura (aumenta recuo na próxima)
            }
            else {
                indent = 0;
            }
            formatted += '  '.repeat(pad) + node + '\n';
            pad += indent;
        });
        const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
        await editor.edit(editBuilder => {
            editBuilder.replace(fullRange, formatted.trim());
        });
    }
    catch (error) {
        vscode.window.showErrorMessage('Erro ao tentar formatar o XML.');
    }
}
//# sourceMappingURL=formatXml.js.map