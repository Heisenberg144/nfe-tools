import * as vscode from 'vscode';
import { parseNfeLine } from '../nfeParser';
import { resolveNfeTag, formatNfeHover } from '../nfeFieldResolver';

export class NfeHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.ProviderResult<vscode.Hover> {
    const line = document.lineAt(position.line).text;
    const cursor = position.character;

    const parsed = parseNfeLine(line, cursor);
    if (!parsed) return null;

    const resolved = resolveNfeTag(parsed.tagName, parsed.tagValue);
    if (!resolved) return null;

    const markdown = formatNfeHover(resolved);
    const contents = new vscode.MarkdownString(markdown);
    contents.isTrusted = true;

    return new vscode.Hover(contents);
  }
}
