# NFe Tools — VS Code Extension

Color themes e ferramentas para documentos fiscais eletrônicos brasileiros.

## Modelos suportados

| Modelo | Descrição | Paleta |
|--------|-----------|--------|
| **NF-e** (mod. 55) | Nota Fiscal Eletrônica | 🟢 Verde esmeralda |
| **NFC-e** (mod. 65) | Nota Fiscal de Consumidor Eletrônica | 🔵 Ciano elétrico |
| **CT-e** (mod. 57/62) | Conhecimento de Transporte Eletrônico | 🟡 Âmbar/dourado |
| **NFS-e** (mod. 13) | Nota Fiscal de Serviços Eletrônica | 🟣 Roxo violeta |
| **MDF-e** (mod. 58) | Manifesto Eletrônico de Documentos Fiscais | 🟠 Laranja intenso |

## Como funciona

1. Abra qualquer arquivo `.xml` de documento fiscal
2. A extensão detecta automaticamente o modelo:
   - Primeiro pela **tag raiz** (`nfeProc`, `CTe`, `CompNfse`, etc.)
   - Fallback pelo **código do modelo** (`<mod>55</mod>`)
3. Aplica o **color theme** correspondente automaticamente
4. Tags coloridas por bloco com **degradê de cor** por profundidade:
   - Bloco pai (ex: `<imposto>`) → cor base vibrante
   - Sub-blocos (ex: `<ICMS>`) → tom médio
   - Alíquotas → tom claro
   - Bases de cálculo → tom mais claro
   - Valores → tom mais suave

## Hover inteligente

Passe o mouse sobre qualquer tag para ver:
- 📦 Descrição do campo
- 🏷️ Valor atual
- 📋 Modelos onde se aplica

## Estrutura do projeto

```
nfe-tools/
├── src/
│   ├── extension.ts          # Entry point da extensão
│   ├── detector/
│   │   └── modelDetector.ts  # Detecção de modelo (tag raiz + cMod)
│   ├── themes/
│   │   └── themeBuilder.ts   # Gerador de temas com paletas
│   ├── hover/
│   │   └── hoverProvider.ts  # Hover provider
│   ├── nfeDictionary.ts      # Dicionário de tags fiscais
│   ├── nfeFieldResolver.ts   # Resolver de tags para hover
│   └── nfeParser.ts          # Parser de linha XML
├── syntaxes/                 # TextMate grammars por modelo
├── themes/                   # Color themes gerados
├── scripts/
│   └── generateThemes.ts     # Script de build dos temas
└── language-configuration.json
```

## Build

```bash
npm install
npm run compile
# Para regenerar os temas:
npx ts-node scripts/generateThemes.ts
```

## Próximas funcionalidades (roadmap)

- [ ] Download de DANFE via chave de acesso (SEFAZ)
- [ ] Pré-validação de campos obrigatórios
- [ ] Webview com resumo estruturado da nota
- [ ] Suporte a lotes de NF-e
