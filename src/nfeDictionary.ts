import { nfseDictionary } from './nfseDictionary';
import { cteDictionary } from './cteDictionary';

export interface NfeField {
  name: string;
  description: string;
  type?: string;
  models?: string[];
}

export interface NfeTag {
  description: string;
  isBlock?: boolean;
  models?: string[];
  fields?: Record<string, NfeField>;
}

export const nfeDictionary: Record<string, NfeTag> = {


  "nfeProc": {
    description: "Envelope de processamento da NF-e. Contém a NF-e e o protocolo de autorização.",
    isBlock: true,
    models: ["55", "65"]
  },
  "NFe": {
    description: "Nota Fiscal Eletrônica. Documento fiscal digital para operações de circulação de mercadorias.",
    isBlock: true,
    models: ["55", "65"]
  },
  "infNFe": {
    description: "Grupo de informações da NF-e. Contém todos os dados do documento fiscal.",
    isBlock: true,
    models: ["55", "65"]
  },
  "infNFeSupl": {
    description: "Informações suplementares da NF-e, como QR Code e URL de consulta (uso na NFC-e).",
    isBlock: true,
    models: ["65"]
  },

  "ide": {
    description: "Identificação da NF-e ou CT-e. Contém dados como modelo, série, número, natureza da operação e datas.",
    isBlock: true,
    models: ["55", "65", "57", "62"]
  },
  "cUF": {
    description: "Código da UF do emitente, conforme tabela do IBGE. Ex: 35 = São Paulo.",
    models: ["55", "65", "57", "62"]
  },
  "cNF": {
    description: "Código numérico que compõe a chave de acesso. Gerado pelo emitente para garantir unicidade.",
    models: ["55", "65"]
  },
  "natOp": {
    description: "Descrição da natureza da operação (ex: Venda de Mercadoria, Remessa para Conserto).",
    models: ["55", "65"]
  },
  "mod": {
    description: "Código do modelo do documento fiscal. **55** = NF-e | **65** = NFC-e | **57** = CT-e | **67** = CT-e OS.",
    models: ["55", "65", "57", "62"]
  },
  "serie": {
    description: "Série do documento fiscal. Faixa 890-899 reservada para emissão em contingência.",
    models: ["55", "65", "57", "62"]
  },
  "nNF": {
    description: "Número sequencial da NF-e. De 1 a 999.999.999, reiniciado a cada série.",
    models: ["55", "65"]
  },
  "nCT": {
    description: "Número sequencial do CT-e. De 1 a 999.999.999.",
    models: ["57", "62"]
  },
  "dhEmi": {
    description: "Data e hora de emissão do documento fiscal no formato AAAA-MM-DDTHH:MM:SS-HH:MM.",
    models: ["55", "65", "57", "62"]
  },
  "dhSaiEnt": {
    description: "Data e hora de saída ou entrada da mercadoria. Determina o momento do fato gerador.",
    models: ["55", "65"]
  },
  "tpNF": {
    description: "Tipo de operação: **0** = Entrada | **1** = Saída.",
    models: ["55", "65"]
  },
  "idDest": {
    description: "Identificação do destino da operação: **1** = Interna | **2** = Interestadual | **3** = Exterior.",
    models: ["55", "65"]
  },
  "cMunFG": {
    description: "Código do município do fato gerador, conforme tabela IBGE.",
    models: ["55", "65"]
  },
  "tpImp": {
    description: "Formato de impressão do DANFE: **1**=Retrato | **2**=Paisagem | **3**=Simplificado | **4**=NFC-e | **5**=NFC-e em contingência.",
    models: ["55", "65"]
  },
  "tpEmis": {
    description: "Tipo de emissão: **1**=Normal | **2**=Contingência FS | **3**=SCAN (desativado) | **4**=DPEC | **5**=Contingência FSDA | **6**=SVC-AN | **7**=SVC-RS | **9**=Offline NFC-e.",
    models: ["55", "65"]
  },
  "cDV": {
    description: "Dígito verificador da chave de acesso. Calculado pelo módulo 11.",
    models: ["55", "65", "57", "62"]
  },
  "tpAmb": {
    description: "Identificação do ambiente: **1** = Produção | **2** = Homologação.",
    models: ["55", "65", "57", "62"]
  },
  "finNFe": {
    description: "Finalidade de emissão: **1**=Normal | **2**=Complementar | **3**=Ajuste | **4**=Devolução.",
    models: ["55", "65"]
  },
  "indFinal": {
    description: "Indicador de operação com consumidor final: **0**=Não | **1**=Sim.",
    models: ["55", "65"]
  },
  "indPres": {
    description: "Indicador de presença do comprador: **0**=Não se aplica | **1**=Presencial | **2**=Internet | **3**=Teleatendimento | **4**=NFC-e entrega domiciliar | **9**=Outros.",
    models: ["55", "65"]
  },
  "procEmi": {
    description: "Processo de emissão: **0**=Aplicativo do contribuinte | **1**=Avulsa Fisco | **2**=Avulsa CNPJ contribuinte | **3**=Contribuinte com app do Fisco.",
    models: ["55", "65"]
  },
  "verProc": {
    description: "Versão do aplicativo utilizado para emissão do documento fiscal.",
    models: ["55", "65", "57", "62"]
  },

  // CHAVE DE ACESSO / PROTOCOLO

  "chNFe": {
    description: "Chave de acesso da NF-e com 44 dígitos. Composição: cUF(2) + AAMM(4) + CNPJ(14) + mod(2) + serie(3) + nNF(9) + tpEmis(1) + cNF(8) + cDV(1).",
    models: ["55", "65"]
  },
  "chCTe": {
    description: "Chave de acesso do CT-e com 44 dígitos. Identifica unicamente o conhecimento de transporte.",
    models: ["57", "62"]
  },
  "nProt": {
    description: "Número do protocolo de autorização ou denegação emitido pela SEFAZ.",
    models: ["55", "65", "57", "62"]
  },
  "digVal": {
    description: "Digest value — hash SHA-1 do XML da NF-e, em Base64. Garante integridade do documento.",
    models: ["55", "65"]
  },
  "dhRecbto": {
    description: "Data e hora do recebimento pela SEFAZ, no formato AAAA-MM-DDTHH:MM:SS.",
    models: ["55", "65", "57", "62"]
  },
  "cStat": {
    description: "Código do status da resposta da SEFAZ. **100** = Autorizado o uso da NF-e | **101** = Cancelamento homologado | **110** = Uso denegado.",
    models: ["55", "65", "57", "62"]
  },
  "xMotivo": {
    description: "Descrição textual do status retornado pela SEFAZ (ex: 'Autorizado o uso da NF-e').",
    models: ["55", "65", "57", "62"]
  },

  "emit": {
    description: "Identificação do emitente do documento fiscal.",
    isBlock: true,
    models: ["55", "65", "57", "62"]
  },
  "CNPJ": {
    description: "CNPJ com 14 dígitos, sem formatação. Válido para emitente, destinatário, transportadora, etc.",
    models: ["55", "65", "57", "62", "13"]
  },
  "CPF": {
    description: "CPF com 11 dígitos, sem formatação. Utilizado quando o emitente ou destinatário é pessoa física.",
    models: ["55", "65", "57", "62", "13"]
  },
  "xNome": {
    description: "Razão social ou nome do emitente/destinatário.",
    models: ["55", "65", "57", "62", "13"]
  },
  "xFant": {
    description: "Nome fantasia do emitente.",
    models: ["55", "65"]
  },
  "IE": {
    description: "Inscrição Estadual do emitente/destinatário. Use 'ISENTO' quando aplicável.",
    models: ["55", "65", "57", "62"]
  },
  "IEST": {
    description: "Inscrição Estadual do substituto tributário.",
    models: ["55", "65"]
  },
  "IM": {
    description: "Inscrição Municipal do emitente, obrigatória em NF-e com serviços sujeitos ao ISSQN.",
    models: ["55", "65", "13"]
  },
  "CNAE": {
    description: "Código CNAE fiscal do emitente.",
    models: ["55", "65"]
  },
  "CRT": {
    description: "Código de Regime Tributário: **1**=Simples Nacional | **2**=Simples Nacional — excesso sublimite | **3**=Regime Normal.",
    models: ["55", "65"]
  },
  "enderEmit": {
    description: "Endereço completo do emitente.",
    isBlock: true,
    models: ["55", "65", "57", "62"]
  },


  "dest": {
    description: "Identificação do destinatário do documento fiscal.",
    isBlock: true,
    models: ["55", "65"]
  },
  "indIEDest": {
    description: "Indicador de IE do destinatário: **1**=Contribuinte ICMS | **2**=Contribuinte isento | **9**=Não contribuinte.",
    models: ["55", "65"]
  },
  "email": {
    description: "E-mail do destinatário para envio do documento fiscal.",
    models: ["55", "65"]
  },
  "enderDest": {
    description: "Endereço completo do destinatário.",
    isBlock: true,
    models: ["55", "65"]
  },


  "xLgr": {
    description: "Logradouro (rua, avenida, etc.).",
    models: ["55", "65", "57", "62", "13"]
  },
  "nro": {
    description: "Número do logradouro. Use 'S/N' quando não houver número.",
    models: ["55", "65", "57", "62", "13"]
  },
  "xCpl": {
    description: "Complemento do endereço (sala, andar, bloco, etc.).",
    models: ["55", "65", "57", "62", "13"]
  },
  "xBairro": {
    description: "Bairro do endereço.",
    models: ["55", "65", "57", "62", "13"]
  },
  "cMun": {
    description: "Código do município conforme tabela IBGE (7 dígitos).",
    models: ["55", "65", "57", "62", "13"]
  },
  "xMun": {
    description: "Nome do município.",
    models: ["55", "65", "57", "62", "13"]
  },
  "UF": {
    description: "Sigla da Unidade da Federação (ex: SP, RJ, MG).",
    models: ["55", "65", "57", "62", "13"]
  },
  "CEP": {
    description: "CEP com 8 dígitos, sem hífen.",
    models: ["55", "65", "57", "62", "13"]
  },
  "cPais": {
    description: "Código do país conforme tabela ISO 3166. Brasil = **1058**.",
    models: ["55", "65", "57", "62"]
  },
  "xPais": {
    description: "Nome do país.",
    models: ["55", "65", "57", "62"]
  },
  "fone": {
    description: "Telefone com DDD, sem formatação.",
    models: ["55", "65", "57", "62", "13"]
  },



  "det": {
    description: "Item do documento fiscal. Cada `<det>` representa um produto ou serviço da nota.",
    isBlock: true,
    models: ["55", "65"]
  },
  "prod": {
    description: "Dados do produto ou serviço do item.",
    isBlock: true,
    models: ["55", "65"]
  },
  "cProd": {
    description: "Código interno do produto no sistema do emitente.",
    models: ["55", "65"]
  },
  "cEAN": {
    description: "GTIN (código de barras EAN) do produto. Use 'SEM GTIN' quando não houver.",
    models: ["55", "65"]
  },
  "cEANTrib": {
    description: "GTIN da unidade tributável do produto.",
    models: ["55", "65"]
  },
  "xProd": {
    description: "Descrição do produto ou serviço.",
    models: ["55", "65"]
  },
  "NCM": {
    description: "Código NCM (Nomenclatura Comum do Mercosul) com 8 dígitos. Determina a tributação federal.",
    models: ["55", "65"]
  },
  "CEST": {
    description: "Código Especificador da Substituição Tributária — identifica a mercadoria sujeita ao ICMS-ST.",
    models: ["55", "65"]
  },
  "CFOP": {
    description: "Código Fiscal de Operações e Prestações. Determina a natureza fiscal da operação. Começa com **1/2** (estadual), **3/4** (interestadual) ou **5/6/7** (externo).",
    models: ["55", "65", "57", "62"]
  },
  "uCom": {
    description: "Unidade de medida comercial (ex: UN, KG, CX, LT).",
    models: ["55", "65"]
  },
  "qCom": {
    description: "Quantidade comercial do produto neste item.",
    models: ["55", "65"]
  },
  "vUnCom": {
    description: "Valor unitário de comercialização.",
    models: ["55", "65"]
  },
  "vProd": {
    description: "Valor bruto total do item (qCom × vUnCom). Não inclui descontos nem acréscimos.",
    models: ["55", "65"]
  },
  "uTrib": {
    description: "Unidade de medida tributável (pode diferir da unidade comercial).",
    models: ["55", "65"]
  },
  "qTrib": {
    description: "Quantidade tributável.",
    models: ["55", "65"]
  },
  "vUnTrib": {
    description: "Valor unitário tributável.",
    models: ["55", "65"]
  },
  "vFrete": {
    description: "Valor do frete rateado para este item.",
    models: ["55", "65"]
  },
  "vSeg": {
    description: "Valor do seguro rateado para este item.",
    models: ["55", "65"]
  },
  "vDesc": {
    description: "Valor do desconto concedido neste item.",
    models: ["55", "65"]
  },
  "vOutro": {
    description: "Outras despesas acessórias rateadas para este item.",
    models: ["55", "65"]
  },
  "indTot": {
    description: "Indica se o valor do item compõe o total da NF-e: **0**=Não | **1**=Sim.",
    models: ["55", "65"]
  },



  "imposto": {
    description: "Tributos incidentes sobre o item. Agrupa ICMS, IPI, PIS, COFINS e outros.",
    isBlock: true,
    models: ["55", "65"]
  },
  "vTotTrib": {
    description: "Valor aproximado dos tributos (federal, estadual e municipal) conforme Lei 12.741/2012.",
    models: ["55", "65"]
  },

  // ICMS
  "ICMS": {
    description: "Imposto sobre Circulação de Mercadorias e Serviços. Grupo de tributação do ICMS do item.",
    isBlock: true,
    models: ["55", "65"]
  },
  "ICMS00": { description: "Tributação ICMS: **Tributada integralmente** (CST 00).", isBlock: true },
  "ICMS10": { description: "Tributação ICMS: **Tributada com cobrança do ICMS por ST** (CST 10).", isBlock: true },
  "ICMS20": { description: "Tributação ICMS: **Com redução de base de cálculo** (CST 20).", isBlock: true },
  "ICMS30": { description: "Tributação ICMS: **Isenta/não tributada com cobrança do ICMS por ST** (CST 30).", isBlock: true },
  "ICMS40": { description: "Tributação ICMS: **Isenta** (CST 40).", isBlock: true },
  "ICMS41": { description: "Tributação ICMS: **Não tributada** (CST 41).", isBlock: true },
  "ICMS50": { description: "Tributação ICMS: **Suspensão** (CST 50).", isBlock: true },
  "ICMS51": { description: "Tributação ICMS: **Diferimento** (CST 51).", isBlock: true },
  "ICMS60": { description: "Tributação ICMS: **ICMS cobrado anteriormente por ST** (CST 60).", isBlock: true },
  "ICMS70": { description: "Tributação ICMS: **Com redução de BC e cobrança do ICMS por ST** (CST 70).", isBlock: true },
  "ICMS90": { description: "Tributação ICMS: **Outras** (CST 90).", isBlock: true },
  "ICMSSN101": { description: "Tributação ICMS Simples Nacional: **Tributada pelo SN sem permissão de crédito** (CSOSN 101).", isBlock: true },
  "ICMSSN102": { description: "Tributação ICMS Simples Nacional: **Tributada pelo SN sem permissão de crédito — ST** (CSOSN 102).", isBlock: true },
  "ICMSSN201": { description: "Tributação ICMS Simples Nacional: **Com ST — com permissão de crédito** (CSOSN 201).", isBlock: true },
  "ICMSSN202": { description: "Tributação ICMS Simples Nacional: **Com ST — sem permissão de crédito** (CSOSN 202).", isBlock: true },
  "ICMSSN500": { description: "Tributação ICMS Simples Nacional: **ICMS cobrado anteriormente por ST** (CSOSN 500).", isBlock: true },
  "ICMSSN900": { description: "Tributação ICMS Simples Nacional: **Outros** (CSOSN 900).", isBlock: true },

  "orig": {
    description: "Origem da mercadoria: **0**=Nacional | **1**=Estrangeira importação direta | **2**=Estrangeira adq. mercado interno | **3**=Nacional — 40%+ importado | **4**=Nacional — processo produtivo básico | **5**=Nacional — 70%+ importado | **6**=Estrangeira importação direta s/ similar | **7**=Estrangeira adq. mercado interno s/ similar | **8**=Nacional — 40%+ importado (Resolução CAMEX).",
    models: ["55", "65"]
  },
  "CST": {
    description: "Código de Situação Tributária do imposto (ICMS, IPI, PIS ou COFINS). Determina o tratamento fiscal aplicado.",
    models: ["55", "65"]
  },
  "CSOSN": {
    description: "Código de Situação da Operação no Simples Nacional. Substitui o CST para empresas do SN.",
    models: ["55", "65"]
  },
  "modBC": {
    description: "Modalidade de determinação da BC do ICMS: **0**=Margem Valor Agregado | **1**=Pauta | **2**=Preço Tabelado | **3**=Valor da Operação.",
    models: ["55", "65"]
  },
  "vBC": {
    description: "Base de cálculo do ICMS.",
    models: ["55", "65"]
  },
  "pRedBC": {
    description: "Percentual de redução da base de cálculo do ICMS.",
    models: ["55", "65"]
  },
  "pICMS": {
    description: "Alíquota do ICMS aplicada sobre a base de cálculo.",
    models: ["55", "65"]
  },
  "vICMS": {
    description: "Valor do ICMS calculado para o item.",
    models: ["55", "65"]
  },
  "vICMSDeson": {
    description: "Valor do ICMS desonerado.",
    models: ["55", "65"]
  },
  "motDesICMS": {
    description: "Motivo da desoneração do ICMS (1=Táxi, 3=Produtor Agropecuário, 6=Utilitários para Deficientes, 7=SUFRAMA, 8=Venda a Órgão Público, 9=Outros, 10=Deficiente Condutor, 11=Deficiente não Condutor, 16=Olimpíadas Rio 2016, 90=Solicitado pelo Fisco).",
    models: ["55", "65"]
  },
  "modBCST": {
    description: "Modalidade de determinação da BC do ICMS ST: **0**=Preço Tabelado | **1**=Lista Negativa | **2**=Lista Positiva | **3**=Lista Neutra | **4**=Margem Valor Agregado | **5**=Pauta.",
    models: ["55", "65"]
  },
  "pMVAST": {
    description: "Percentual da Margem de Valor Adicionado do ICMS ST.",
    models: ["55", "65"]
  },
  "pRedBCST": {
    description: "Percentual de redução da base de cálculo do ICMS ST.",
    models: ["55", "65"]
  },
  "vBCST": {
    description: "Base de cálculo do ICMS Substituição Tributária.",
    models: ["55", "65"]
  },
  "pICMSST": {
    description: "Alíquota do ICMS Substituição Tributária.",
    models: ["55", "65"]
  },
  "vICMSST": {
    description: "Valor do ICMS Substituição Tributária.",
    models: ["55", "65"]
  },
  "pFCP": {
    description: "Alíquota do Fundo de Combate à Pobreza (FCP).",
    models: ["55", "65"]
  },
  "vFCP": {
    description: "Valor do Fundo de Combate à Pobreza (FCP).",
    models: ["55", "65"]
  },
  "pFCPST": {
    description: "Alíquota do FCP retido por Substituição Tributária.",
    models: ["55", "65"]
  },
  "vFCPST": {
    description: "Valor do FCP retido por Substituição Tributária.",
    models: ["55", "65"]
  },

  // IPI
  "IPI": {
    description: "Imposto sobre Produtos Industrializados. Aplicado em produtos saídos de estabelecimento industrial.",
    isBlock: true,
    models: ["55"]
  },
  "IPITrib": {
    description: "Grupo de tributação do IPI — tributado.",
    isBlock: true,
    models: ["55"]
  },
  "IPINT": {
    description: "Grupo de tributação do IPI — não tributado.",
    isBlock: true,
    models: ["55"]
  },
  "cEnq": {
    description: "Código de enquadramento legal do IPI.",
    models: ["55"]
  },
  "vBCIPI": {
    description: "Base de cálculo do IPI.",
    models: ["55"]
  },
  "pIPI": {
    description: "Alíquota do IPI em percentual.",
    models: ["55"]
  },
  "vIPI": {
    description: "Valor do IPI.",
    models: ["55"]
  },

  // PIS
  "PIS": {
    description: "Programa de Integração Social. Contribuição federal incidente sobre o faturamento.",
    isBlock: true,
    models: ["55", "65"]
  },
  "PISAliq": {
    description: "Grupo PIS — tributado por alíquota em percentual (CST 01, 02, 05).",
    isBlock: true,
    models: ["55", "65"]
  },
  "PISQtde": {
    description: "Grupo PIS — tributado por alíquota em valor (CST 03).",
    isBlock: true,
    models: ["55", "65"]
  },
  "PISNT": {
    description: "Grupo PIS — operação não tributada (CST 04, 06, 07, 08, 09).",
    isBlock: true,
    models: ["55", "65"]
  },
  "PISOutr": {
    description: "Grupo PIS — outras operações (CST 49, 50, 99).",
    isBlock: true,
    models: ["55", "65"]
  },
  "vBCPIS": {
    description: "Base de cálculo do PIS.",
    models: ["55", "65"]
  },
  "pPIS": {
    description: "Alíquota do PIS em percentual.",
    models: ["55", "65"]
  },
  "vPIS": {
    description: "Valor do PIS.",
    models: ["55", "65"]
  },

  // COFINS
  "COFINS": {
    description: "Contribuição para o Financiamento da Seguridade Social. Contribuição federal sobre o faturamento.",
    isBlock: true,
    models: ["55", "65"]
  },
  "COFINSAliq": {
    description: "Grupo COFINS — tributado por alíquota em percentual (CST 01, 02, 05).",
    isBlock: true,
    models: ["55", "65"]
  },
  "COFINSQtde": {
    description: "Grupo COFINS — tributado por alíquota em valor (CST 03).",
    isBlock: true,
    models: ["55", "65"]
  },
  "COFINSNT": {
    description: "Grupo COFINS — operação não tributada (CST 04, 06, 07, 08, 09).",
    isBlock: true,
    models: ["55", "65"]
  },
  "COFINSOutr": {
    description: "Grupo COFINS — outras operações (CST 49, 50, 99).",
    isBlock: true,
    models: ["55", "65"]
  },
  "vBCCOFINS": {
    description: "Base de cálculo da COFINS.",
    models: ["55", "65"]
  },
  "pCOFINS": {
    description: "Alíquota da COFINS em percentual.",
    models: ["55", "65"]
  },
  "vCOFINS": {
    description: "Valor da COFINS.",
    models: ["55", "65"]
  },

  // TOTAIS

  "total": {
    description: "Totais do documento fiscal. Agrupa ICMSTot, ISSQNtot e retTrib.",
    isBlock: true,
    models: ["55", "65"]
  },
  "ICMSTot": {
    description: "Totais referentes ao ICMS de todos os itens da NF-e.",
    isBlock: true,
    models: ["55", "65"]
  },
  "vNF": {
    description: "**Valor total da NF-e.** Campo dominante do documento — soma de produtos, frete, seguro, outras despesas, menos descontos, mais IPI quando aplicável.",
    models: ["55", "65"]
  },

  "vProdi": {
    description: "Valor total dos produtos e serviços (bruto, sem descontos ou acréscimos).",
    models: ["55", "65"]
  },
  "ISSQNtot": {
    description: "Totais referentes ao ISSQN (serviços).",
    isBlock: true,
    models: ["55", "65"]
  },
  "retTrib": {
    description: "Valores de retenção de tributos federais (IR, CSLL, COFINS retido, PIS retido, INSS).",
    isBlock: true,
    models: ["55", "65"]
  },

  // TRANSPORTE

  "transp": {
    description: "Informações sobre o transporte da mercadoria.",
    isBlock: true,
    models: ["55"]
  },
  "modFrete": {
    description: "Modalidade do frete: **0**=Contratação por conta do emitente (CIF) | **1**=Por conta do destinatário (FOB) | **2**=Por conta de terceiros | **3**=Próprio por conta do remetente | **4**=Próprio por conta do destinatário | **9**=Sem frete.",
    models: ["55"]
  },
  "transporta": {
    description: "Dados da transportadora.",
    isBlock: true,
    models: ["55"]
  },
  "veicTransp": {
    description: "Dados do veículo de transporte.",
    isBlock: true,
    models: ["55"]
  },
  "vol": {
    description: "Dados dos volumes transportados.",
    isBlock: true,
    models: ["55"]
  },

  // COBRANÇA / PAGAMENTO

  "cobr": {
    description: "Informações de cobrança (fatura e duplicatas).",
    isBlock: true,
    models: ["55"]
  },
  "fat": {
    description: "Dados da fatura.",
    isBlock: true,
    models: ["55"]
  },
  "dup": {
    description: "Dados da duplicata (parcela de cobrança).",
    isBlock: true,
    models: ["55"]
  },
  "pag": {
    description: "Grupo de detalhamento de formas de pagamento.",
    isBlock: true,
    models: ["55", "65"]
  },
  "detPag": {
    description: "Detalhe de cada forma de pagamento utilizada.",
    isBlock: true,
    models: ["55", "65"]
  },
  "tPag": {
    description: "Tipo de pagamento: **01**=Dinheiro | **02**=Cheque | **03**=Cartão de Crédito | **04**=Cartão de Débito | **05**=Crédito Loja | **10**=Vale Alimentação | **11**=Vale Refeição | **12**=Vale Presente | **13**=Vale Combustível | **15**=Boleto Bancário | **90**=Sem Pagamento | **99**=Outros.",
    models: ["55", "65"]
  },
  "vPag": {
    description: "Valor total pago nesta forma de pagamento.",
    models: ["55", "65"]
  },

  // INFORMAÇÕES ADICIONAIS

  "infAdic": {
    description: "Informações adicionais do documento fiscal.",
    isBlock: true,
    models: ["55", "65"]
  },
  "infCpl": {
    description: "Informações complementares de interesse do contribuinte (campo livre para texto).",
    models: ["55", "65"]
  },
  "infAdFisco": {
    description: "Informações adicionais de interesse do Fisco.",
    models: ["55", "65"]
  },

  ...nfseDictionary,
  ...cteDictionary
};
