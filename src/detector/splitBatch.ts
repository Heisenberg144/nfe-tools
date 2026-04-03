import * as vscode from 'vscode';

export async function splitBatchCommand() {
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

  if (!folderUri || folderUri.length === 0) return;
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
        if (chave) fileName = `${chave}.xml`;
      }

      // Garante que todo arquivo extraído comece com uma declaração XML válida
      const finalXml = noteXml.startsWith('<?xml') ? noteXml : `<?xml version="1.0" encoding="UTF-8"?>\n${noteXml}`;
      await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(targetFolder, fileName), new TextEncoder().encode(finalXml));
      count++;
    }
    vscode.window.showInformationMessage(`✅ Sucesso! ${count} notas foram extraídas e salvas separadamente.`);
  });
}