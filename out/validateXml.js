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
exports.validateXmlCommand = validateXmlCommand;
const vscode = __importStar(require("vscode"));
const modelDetector_1 = require("./detector/modelDetector");
async function validateXmlCommand() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('Nenhum arquivo XML aberto para validar.');
        return;
    }
    const document = editor.document;
    const text = document.getText();
    const detection = (0, modelDetector_1.detectFiscalModel)(text);
    if (detection.model === 'unknown') {
        vscode.window.showWarningMessage('Modelo fiscal desconhecido. Não é possível validar as tags.');
        return;
    }
    // Definição das tags obrigatórias estruturais para cada modelo
    const requiredTags = {
        'nfe': ['infNFe', 'ide', 'nNF', 'emit', 'CNPJ', 'det', 'total', 'vNF', 'chNFe'],
        'nfce': ['infNFe', 'ide', 'nNF', 'emit', 'CNPJ', 'det', 'total', 'vNF', 'chNFe'],
        'cte': ['infCte', 'ide', 'nCT', 'emit', 'CNPJ', 'vTPrest', 'chCTe'],
        'cteos': ['infCte', 'ide', 'nCT', 'emit', 'CNPJ', 'vTPrest', 'chCTe'],
        'mdfe': ['infMDFe', 'ide', 'emit', 'CNPJ', 'infModal', 'chMDFe'],
        'nfse': ['Prestador', 'Servico', 'Valores', 'ValorServicos'] // Varia por Prefeitura, checagem mínima
    };
    const tagsToCheck = requiredTags[detection.model] || [];
    const missingTags = tagsToCheck.filter(tag => !(new RegExp(`<${tag}[\\s>]`).test(text)));
    if (missingTags.length > 0) {
        vscode.window.showWarningMessage(`O documento ${detection.label} está incompleto. Tags ausentes: <${missingTags.join('>, <')}>`);
    }
    else {
        vscode.window.showInformationMessage(`✅ Validação concluída! Todas as tags estruturais do ${detection.label} estão presentes.`);
    }
}
//# sourceMappingURL=validateXml.js.map