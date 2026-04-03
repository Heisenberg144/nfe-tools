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
exports.ToolItem = exports.ToolsTreeProvider = void 0;
const vscode = __importStar(require("vscode"));
class ToolsTreeProvider {
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element) {
            return Promise.resolve([]);
        }
        else {
            // Itens da raiz (Nossos comandos atuais)
            return Promise.resolve([
                new ToolItem('Visualizar DANFE (Resumo)', 'Gera uma visualização da nota no arquivo XML atual.', vscode.TreeItemCollapsibleState.None, { command: 'nfe-tools.openViewer', title: 'Abrir Visualizador' }, 'preview' // Ícone nativo do VS Code
                ),
                new ToolItem('Formatar/Identar XML', 'Organiza um XML minificado em múltiplas linhas e recuos.', vscode.TreeItemCollapsibleState.None, { command: 'nfe-tools.formatXml', title: 'Formatar XML' }, 'list-tree'),
                new ToolItem('Desmembrar Lote', 'Se o XML for um Lote contendo várias notas, extrai todas em arquivos separados.', vscode.TreeItemCollapsibleState.None, { command: 'nfe-tools.splitBatch', title: 'Desmembrar Lote' }, 'files'),
                new ToolItem('Baixar XML via Chave', 'Faz o download de um arquivo XML da SEFAZ/Prefeitura usando a chave.', vscode.TreeItemCollapsibleState.None, { command: 'nfe-tools.downloadXml', title: 'Baixar XML' }, 'cloud-download')
            ]);
        }
    }
}
exports.ToolsTreeProvider = ToolsTreeProvider;
class ToolItem extends vscode.TreeItem {
    constructor(label, tooltip, collapsibleState, command, iconName) {
        super(label, collapsibleState);
        this.label = label;
        this.tooltip = tooltip;
        this.collapsibleState = collapsibleState;
        this.command = command;
        this.iconName = iconName;
        this.tooltip = tooltip;
        if (iconName) {
            this.iconPath = new vscode.ThemeIcon(iconName);
        }
    }
}
exports.ToolItem = ToolItem;
//# sourceMappingURL=toolsTreeProvider.js.map