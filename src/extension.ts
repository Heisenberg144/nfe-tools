import * as vscode from 'vscode';
import { detectFiscalModel, FiscalModel } from './detector/modelDetector';
import { NfeHoverProvider } from './hover/hoverProvider';
import { promptAndDownloadXml } from './downloadXml';
import { openViewer } from './openViewer';
import { ToolsTreeProvider } from './toolsTreeProvider';
import { formatXmlCommand } from './formatXml';
import { validateXmlCommand } from './validateXml';
import { exportPdfCommand } from './exportPdf';
import { splitBatchCommand } from './detector/splitBatch';

// Cache simples para evitar notificações repetidas na mesma sessão
const context_cache = new Set<string>();

//  Ativação da extensão 

export function activate(context: vscode.ExtensionContext) {
  console.log('NFe Tools: ativado');

  // 1. Ao abrir qualquer XML, detecta e troca linguagem + tema
  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(doc => handleXmlDocument(doc)),
    vscode.window.onDidChangeActiveTextEditor(editor => {
      if (editor) handleXmlDocument(editor.document);
    })
  );

  // 2. Se já tiver arquivo XML aberto ao ativar
  if (vscode.window.activeTextEditor) {
    handleXmlDocument(vscode.window.activeTextEditor.document);
  }

  // 3. Hover providers para todos os modelos fiscais
  const fiscalLangs = ['nfe', 'nfce', 'cte', 'nfse', 'mdfe', 'nfcom'];
  for (const lang of fiscalLangs) {
    context.subscriptions.push(
      vscode.languages.registerHoverProvider(
        { language: lang },
        new NfeHoverProvider()
      )
    );
  }

  // 4. Comando manual
  context.subscriptions.push(
    vscode.commands.registerCommand('nfe-tools.openViewer', () => {
      openViewer(context);
    })
  );

  // Comando de Formatação
  context.subscriptions.push(
    vscode.commands.registerCommand('nfe-tools.formatXml', () => {
      formatXmlCommand();
    })
  );

  // Comando de Validação
  context.subscriptions.push(
    vscode.commands.registerCommand('nfe-tools.validateXml', () => {
      validateXmlCommand();
    })
  );

  // Comando de Desmembrar Lotes
  context.subscriptions.push(
    vscode.commands.registerCommand('nfe-tools.splitBatch', () => {
      splitBatchCommand();
    })
  );

  // Comando de Exportar PDF
  context.subscriptions.push(
    vscode.commands.registerCommand('nfe-tools.exportPdf', () => {
      exportPdfCommand();
    })
  );

  // 5. Comando de Download via Chave de Acesso
  context.subscriptions.push(
    vscode.commands.registerCommand('nfe-tools.downloadXml', () => promptAndDownloadXml())
  );

  // 6. Barra Lateral de Ferramentas (TreeView)
  const toolsProvider = new ToolsTreeProvider();
  vscode.window.registerTreeDataProvider('nfe-tools-menu', toolsProvider);
}

export function deactivate() {}

//  Lógica de detecção e troca 

async function handleXmlDocument(
  doc: vscode.TextDocument,
  forceNotify = false
) {
  // Só processa XML
  if (!doc.fileName.endsWith('.xml') && doc.languageId !== 'xml') return;

  const content = doc.getText();
  if (!content.trim()) return;

  const result = detectFiscalModel(content);
  if (result.model === 'unknown') return;

  // Troca a linguagem do arquivo para ativar a grammar correta
  if (doc.languageId !== result.languageId) {
    await vscode.languages.setTextDocumentLanguage(doc, result.languageId);
  }

  // Aplica o tema de cor correspondente
  await applyTheme(result.themeId);

  // Notificação discreta (apenas na primeira detecção ou quando forçado)
  const key = `nfe-tools.notified.${doc.fileName}`;
  const alreadyNotified = context_cache.has(key);

  if (!alreadyNotified || forceNotify) {
    context_cache.add(key);
    vscode.window.setStatusBarMessage(
      `$(symbol-file) NFe Tools: ${result.label} detectado (via ${result.detectedBy})`,
      5000
    );
  }
}

async function applyTheme(themeId: string) {
  const config = vscode.workspace.getConfiguration('workbench');
  const current = config.get<string>('colorTheme');
  if (current === themeId) return;

  await config.update('workbench.colorTheme', themeId, vscode.ConfigurationTarget.Global);
}
