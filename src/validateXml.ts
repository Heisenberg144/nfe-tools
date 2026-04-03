import * as vscode from 'vscode';
import { detectFiscalModel } from './detector/modelDetector';

export async function validateXmlCommand() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage('Nenhum arquivo XML aberto para validar.');
    return;
  }

  const document = editor.document;
  const text = document.getText();

  const detection = detectFiscalModel(text);
  if (detection.model === 'unknown') {
    vscode.window.showWarningMessage('Modelo fiscal desconhecido. Não é possível validar as tags.');
    return;
  }

  // Definição das tags obrigatórias estruturais para cada modelo
  const requiredTags: Record<string, string[]> = {
    'nfe': ['infNFe', 'ide', 'nNF', 'emit', 'CNPJ', 'det', 'total', 'vNF', 'chNFe'],
    'nfce': ['infNFe', 'ide', 'nNF', 'emit', 'CNPJ', 'det', 'total', 'vNF', 'chNFe'],
    'cte': ['infCte', 'ide', 'nCT', 'emit', 'CNPJ', 'vTPrest', 'chCTe'],
    'cteos': ['infCte', 'ide', 'nCT', 'emit', 'CNPJ', 'vTPrest', 'chCTe'],
    'mdfe': ['infMDFe', 'ide', 'emit', 'CNPJ', 'infModal', 'chMDFe'],
    'nfse': ['Prestador', 'Servico', 'Valores', 'ValorServicos'] // Varia por Prefeitura, checagem mínima
  };

  const tagsToCheck = requiredTags[detection.model] || [];
  const missingTags = tagsToCheck.filter(tag => !(new RegExp(`<${tag}[\\s>]`).test(text)));

  if (missingTags.length > 0) {
    vscode.window.showWarningMessage(`O documento ${detection.label} está incompleto. Tags ausentes: <${missingTags.join('>, <')}>`);
  } else {
    vscode.window.showInformationMessage(`✅ Validação concluída! Todas as tags estruturais do ${detection.label} estão presentes.`);
  }
}