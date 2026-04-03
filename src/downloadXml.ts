import * as vscode from 'vscode';

export async function promptAndDownloadXml() {
  // Pede a chave de acesso ao usuário
  const chave = await vscode.window.showInputBox({
    prompt: 'Digite a Chave de Acesso (44 dígitos)',
    placeHolder: 'Ex: 35230112345678000123550010001234561000000001',
    validateInput: text => {
      const clean = text.replace(/\D/g, '');
      return clean.length === 44 ? null : 'A chave de acesso deve conter exatamente 44 dígitos numéricos.';
    }
  });

  if (!chave) return; // Usuário cancelou
  const cleanChave = chave.replace(/\D/g, '');

  // Lê as configurações do usuário
  const config = vscode.workspace.getConfiguration('nfe-tools');
  const apiProvider = config.get<string>('apiProvider');
  const apiToken = config.get<string>('apiToken');

  // Se o usuário configurou uma API paga
  if (apiProvider && apiProvider !== 'Nenhum (Portais Públicos)' && apiToken) {
    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `NFe Tools: Baixando XML via ${apiProvider}...`,
      cancellable: false
    }, async () => {
      try {
        let url = '';
        let headers: Record<string, string> = {};

        if (apiProvider === 'Nuvem Fiscal') {
          url = `https://api.nuvemfiscal.com.br/nfe/${cleanChave}/xml`;
          headers = { 'Authorization': `Bearer ${apiToken}` };
        } else if (apiProvider === 'FSIST API') {
          url = `https://api.fsist.com.br/nfe/${cleanChave}`;
          headers = { 'x-api-key': apiToken }; // Exemplo de header genérico
        }

        const response = await fetch(url, { headers });
        if (!response.ok) {
          throw new Error(`API retornou ${response.status}. Verifique seu token e se a nota existe no portal.`);
        }

        // Obtém o texto do XML retornado pela API
        const xmlString = await response.text();

        // Determina o local para salvar (Workspace atual ou pede para escolher)
        const workspaceFolders = vscode.workspace.workspaceFolders;
        const targetUri = workspaceFolders 
          ? vscode.Uri.joinPath(workspaceFolders[0].uri, `${cleanChave}.xml`)
          : (await vscode.window.showSaveDialog({ defaultUri: vscode.Uri.file(`${cleanChave}.xml`) }));
        
        if (!targetUri) return;

        // Salva e abre o arquivo no VS Code
        const xmlData = new TextEncoder().encode(xmlString);
        await vscode.workspace.fs.writeFile(targetUri, xmlData);
        
        const doc = await vscode.workspace.openTextDocument(targetUri);
        await vscode.window.showTextDocument(doc);
        vscode.window.showInformationMessage('XML baixado com sucesso!');

      } catch (err: any) {
        vscode.window.showErrorMessage(`Falha ao baixar o XML: ${err.message}`);
      }
    });
    return; // Encerra a execução para não exibir as opções gratuitas
  }

  // Opções de portais públicos gratuitos
  const portal = await vscode.window.showQuickPick([
    { label: '$(globe) Portal FSIST', description: 'Baixar XML sem certificado', url: 'https://www.fsist.com.br/' },
    { label: '$(globe) DANFE Online', description: 'Gerar PDF e XML', url: 'https://www.danfeonline.com.br/' },
    { label: '$(globe) Portal Nacional da NF-e', description: 'Consulta oficial SEFAZ', url: 'https://www.nfe.fazenda.gov.br/portal/consultaRecaptcha.aspx?tipoConsulta=resumo&tipoConteudo=7PhJ+gAVw2g=' }
  ], {
    placeHolder: 'Escolha o portal para baixar o XML'
  });

  if (portal) {
    // Copia a chave para a área de transferência silenciosamente
    await vscode.env.clipboard.writeText(cleanChave);
    
    vscode.window.showInformationMessage(`Chave copiada! Dê um Ctrl+V no ${portal.label.replace('$(globe) ', '')} para baixar seu XML.`);
    
    // Abre o navegador padrão do usuário
    vscode.env.openExternal(vscode.Uri.parse(portal.url));
  }
}