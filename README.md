<h1 align="center">
  📦 NFe Tools — VS Code Extension
</h1>

<p align="center">
  <b>A ferramenta definitiva para desenvolvedores e analistas que trabalham com Documentos Fiscais Eletrônicos Brasileiros no VS Code.</b>
</p>

---

O **NFe Tools** transforma o seu editor num verdadeiro canivete suíço fiscal. Identifique modelos automaticamente, destaque tags XML com temas de cores específicos, visualize DANFEs nativamente, desmembre lotes e baixe notas da SEFAZ, tudo sem sair do VS Code!

## ✨ Principais Funcionalidades

- 🎨 **Temas de Cores Inteligentes:** Ao abrir um XML, a extensão detecta se é uma NF-e, CT-e ou NFS-e e aplica um Color Theme dinâmico. As cores respeitam a hierarquia das tags (ex: Impostos, Destinatário, Transporte) ajudando seus olhos a encontrarem os dados rapidamente.
- 🏷️ **Dicionário em Hover:** Pare de decorar manuais do contribuinte! Passe o mouse sobre qualquer tag (ex: `<cStat>`, `<mod>`) e um balão de documentação explicará o que ela significa e os valores aceitos.
- 📄 **Visualizador de DANFE (Webview):** Visualize um resumo amigável e formatado da nota fiscal com os dados do Emitente, Destinatário, Totais e uma tabela completa de Itens/Produtos ao lado do código.
- ✂️ **Desmembrar Lotes:** Recebeu um XML gigante com 50 notas dentro de um `<enviNFe>`? Com um clique, extraia e salve todas as notas individualmente, nomeadas pela Chave de Acesso.
- 🧹 **Formatação de XML (Beautifier):** Formate e indente XMLs minificados (de uma linha só) instantaneamente.
- ✔️ **Validação Estrutural:** Verifique se o documento aberto está faltando alguma tag estrutural obrigatória (`<chNFe>`, `<CNPJ>`, `<vNF>`).
- 📥 **Download de XML via Chave:** Baixe o arquivo XML original da SEFAZ usando apenas a Chave de Acesso de 44 dígitos (suporte integrado aos portais FSIST e Nuvem Fiscal).
- 🖨️ **Exportar PDF:** Converta seus arquivos XML em representações PDF prontas para impressão usando serviços integrados.

---

## 📑 Modelos Fiscais Suportados

A extensão mapeia dezenas de padrões automaticamente através da tag Raiz e do `<mod>`:

| Modelo Fiscal         | Descrição                                  | Paleta de Cor Base           |
| :-------------------- | :----------------------------------------- | :--------------------------- |
| **NF-e** (mod. 55)    | Nota Fiscal Eletrônica                     | 🟢 Verde esmeralda e Índigo  |
| **NFC-e** (mod. 65)   | Nota Fiscal de Consumidor Eletrônica       | 🔵 Ciano elétrico e Teal     |
| **CT-e** (mod. 57/62) | Conhecimento de Transporte Eletrônico      | 🟡 Âmbar e Dourado           |
| **MDF-e** (mod. 58)   | Manifesto Eletrônico de Documentos         | 🟠 Laranja intenso e Púrpura |
| **NFS-e** (mod. 13)   | Nota Fiscal de Serviço (ABRASF/DSF/Ginfes) | 🟣 Roxo violeta e Rosa       |

---

## 🚀 Como Usar

A extensão injeta um **Painel Exclusivo na sua Barra Lateral** (ícone de arquivo `< >`). Clicando nele, você tem acesso à seção **Ações Rápidas**, de onde você pode disparar todas as ferramentas nos arquivos abertos!

Você também pode acessar as ferramentas de três outras maneiras:

1. Clicando com o **botão direito** dentro de qualquer arquivo `.xml`.
2. Pela Command Palette (`Ctrl + Shift + P` ou `Cmd + Shift + P`) digitando `NFe Tools`.
3. Via atalhos de teclado (podem ser configurados nas opções do VS Code).

---

## ⚙️ Configurações e API (Opcional)

As funções de **Download de XML** e **Geração de PDF** em segundo plano requerem comunicação com a internet. Por padrão, a extensão copiará os dados de forma inteligente e abrirá o navegador padrão (Modo Gratuito) em portais confiáveis (FSIST, DanfeOnline, SEFAZ).

No entanto, desenvolvedores que tiverem **Tokens de API (API Keys)** de serviços fiscais podem integrar a extensão diretamente, configurando via:
`File > Preferences > Settings > Extensions > NFe Tools`

- **API Provider:** Selecione "Nuvem Fiscal", "FSIST API", etc.
- **API Token:** Cole aqui o seu Token (Bearer/Key).

Ao configurar isso, a extensão fará downloads transparentes em background sem abrir o navegador!

---

## 👨‍💻 Contribuindo

Encontrou algum problema em alguma tag específica da sua Prefeitura? A tag `<xNome>` não coloriu direito num layout obscuro?
Sinta-se à vontade para abrir uma **Issue** ou enviar um **Pull Request** no repositório oficial do GitHub.

- Extensão construída com TypeScript e as novas APIs nativas do VS Code.
- As cores TextMate são orquestradas usando geradores dinâmicos de Palette.

---

**Licença MIT** © 2024 Adrian Gabriel Cirino.
