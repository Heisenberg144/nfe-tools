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
exports.NfeHoverProvider = void 0;
const vscode = __importStar(require("vscode"));
const nfeParser_1 = require("../nfeParser");
const nfeFieldResolver_1 = require("../nfeFieldResolver");
const modelDetector_1 = require("../detector/modelDetector");
class NfeHoverProvider {
    provideHover(document, position) {
        const line = document.lineAt(position.line).text;
        const cursor = position.character;
        const parsed = (0, nfeParser_1.parseNfeLine)(line, cursor);
        if (!parsed)
            return null;
        // Pega apenas as primeiras 30 linhas para não travar o VS Code em XMLs gigantes
        const peekText = document.getText(new vscode.Range(0, 0, 30, 0));
        // Identifica se é NF-e, CT-e, NFS-e, etc.
        const detection = (0, modelDetector_1.detectFiscalModel)(peekText);
        // Passamos o modelo detectado para o resolver buscar a documentação correta
        const resolved = (0, nfeFieldResolver_1.resolveNfeTag)(parsed.tagName, parsed.tagValue, detection.model);
        if (!resolved)
            return null;
        const markdown = (0, nfeFieldResolver_1.formatNfeHover)(resolved, detection.model);
        const contents = new vscode.MarkdownString(markdown);
        contents.isTrusted = true;
        return new vscode.Hover(contents);
    }
}
exports.NfeHoverProvider = NfeHoverProvider;
//# sourceMappingURL=hoverProvider.js.map