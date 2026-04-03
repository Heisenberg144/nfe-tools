import * as vscode from 'vscode';
import { parseNfeLine } from '../nfeParser';
import { resolveNfeTag, formatNfeHover } from '../nfeFieldResolver';
import { detectFiscalModel } from '../detector/modelDetector';

export class NfeHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.ProviderResult<vscode.Hover> {
    const line = document.lineAt(position.line).text;
    const cursor = position.character;

    const parsed = parseNfeLine(line, cursor);
    if (!parsed) return null;

    // Pega apenas as primeiras 30 linhas para não travar o VS Code em XMLs gigantes
    const peekText = document.getText(new vscode.Range(0, 0, 30, 0));
    
    // Identifica se é NF-e, CT-e, NFS-e, etc.
    const detection = detectFiscalModel(peekText);

    // Passamos o modelo detectado para o resolver buscar a documentação correta
    const resolved = resolveNfeTag(parsed.tagName, parsed.tagValue, detection.model);
    if (!resolved) return null;

    const markdown = formatNfeHover(resolved, detection.model);
    const contents = new vscode.MarkdownString(markdown);
    contents.isTrusted = true;

    return new vscode.Hover(contents);
  }
}
