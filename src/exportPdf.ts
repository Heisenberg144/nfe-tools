import * as vscode from 'vscode';
import { detectFiscalModel } from './detector/modelDetector';

export async function exportPdfCommand() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage('Nenhum arquivo XML aberto para exportar.');
    return;
  }

  const document = editor.document;
  const text = document.getText();

  const detection = detectFiscalModel(text);
  if (detection.model === 'unknown') {
    vscode.window.showWarningMessage('Não foi possível identificar o modelo do XML aberto.');
    return;
  }

  const config = vscode.workspace.getConfiguration('nfe-tools');
  const apiProvider = config.get<string>('apiProvider');
  const apiToken = config.get<string>('apiToken');

  if (apiProvider && apiProvider !== 'Nenhum (Portais Públicos)' && apiToken) {
    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `NFe Tools: Solicitando PDF via ${apiProvider}...`,
      cancellable: false
    }, async () => {
      try {
        // Em uma implementação real final, aqui você envia o XML em Base64 ou string para o endpoint da sua API.
        // Ex: const res = await fetch('https://api.nuvemfiscal.com.br/nfe/danfe', { method: 'POST', body: ... })
        
        // Simulação
        await new Promise(resolve => setTimeout(resolve, 1500));
        vscode.window.showInformationMessage(`A geração de PDF via ${apiProvider} estará disponível na próxima atualização de API!`);
      } catch (err: any) {
        vscode.window.showErrorMessage(`Falha ao converter PDF: ${err.message}`);
      }
    });
  } else {
    // Fallback Gratuito: Copia o XML para a área de transferência e redireciona
    const choice = await vscode.window.showInformationMessage(
      'Para gerar o PDF (DANFE/DACTE) gratuitamente, o XML será copiado e redirecionaremos você para o portal DANFE Online.',
      'Gerar PDF no Navegador'
    );

    if (choice === 'Gerar PDF no Navegador') {
      await vscode.env.clipboard.writeText(text);
      vscode.env.openExternal(vscode.Uri.parse('https://www.danfeonline.com.br/'));
    }
  }
}