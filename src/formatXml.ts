import * as vscode from 'vscode';

export async function formatXmlCommand() {
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
      } else if (node.match(/^<\/[\w:]/)) {
        if (pad !== 0) pad -= 1; // Tag de fechamento isolada (diminui recuo)
      } else if (node.match(/^<[\w:][^>]*[^\/]>.*$/)) {
        indent = 1; // Nova tag de abertura (aumenta recuo na próxima)
      } else {
        indent = 0;
      }

      formatted += '  '.repeat(pad) + node + '\n';
      pad += indent;
    });

    const fullRange = new vscode.Range(
      document.positionAt(0),
      document.positionAt(text.length)
    );

    await editor.edit(editBuilder => {
      editBuilder.replace(fullRange, formatted.trim());
    });
  } catch (error) {
    vscode.window.showErrorMessage('Erro ao tentar formatar o XML.');
  }
}