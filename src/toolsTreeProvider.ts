import * as vscode from 'vscode';

export class ToolsTreeProvider implements vscode.TreeDataProvider<ToolItem> {
  getTreeItem(element: ToolItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: ToolItem): Thenable<ToolItem[]> {
    if (element) {
      return Promise.resolve([]);
    } else {
      // Itens da raiz (Nossos comandos atuais)
      return Promise.resolve([
        new ToolItem(
          'Visualizar DANFE (Resumo)',
          'Gera uma visualização da nota no arquivo XML atual.',
          vscode.TreeItemCollapsibleState.None,
          { command: 'nfe-tools.openViewer', title: 'Abrir Visualizador' },
          'preview' // Ícone nativo do VS Code
        ),
        new ToolItem(
          'Formatar/Identar XML',
          'Organiza um XML minificado em múltiplas linhas e recuos.',
          vscode.TreeItemCollapsibleState.None,
          { command: 'nfe-tools.formatXml', title: 'Formatar XML' },
          'list-tree'
        ),
        new ToolItem(
          'Desmembrar Lote',
          'Se o XML for um Lote contendo várias notas, extrai todas em arquivos separados.',
          vscode.TreeItemCollapsibleState.None,
          { command: 'nfe-tools.splitBatch', title: 'Desmembrar Lote' },
          'files'
        ),
        new ToolItem(
          'Baixar XML via Chave',
          'Faz o download de um arquivo XML da SEFAZ/Prefeitura usando a chave.',
          vscode.TreeItemCollapsibleState.None,
          { command: 'nfe-tools.downloadXml', title: 'Baixar XML' },
          'cloud-download'
        )
      ]);
    }
  }
}

export class ToolItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly tooltip: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command,
    public readonly iconName?: string
  ) {
    super(label, collapsibleState);
    this.tooltip = tooltip;
    if (iconName) {
      this.iconPath = new vscode.ThemeIcon(iconName);
    }
  }
}