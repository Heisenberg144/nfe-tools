"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nfseDictionary = void 0;
exports.nfseDictionary = {
    "CompNfse": {
        description: "Componente da NFS-e. Agrupa a nota de serviço e o cancelamento (quando houver).",
        isBlock: true,
        models: ["13"]
    },
    "Nfse": {
        description: "Nota Fiscal de Serviços Eletrônica — padrão nacional (modelo 13).",
        isBlock: true,
        models: ["13"]
    },
    "InfNfse": {
        description: "Informações da NFS-e. Contém identificação, prestador, tomador, serviço e valores.",
        isBlock: true,
        models: ["13"]
    },
    "InfDeclaracaoPrestacaoServico": {
        description: "Informações da declaração de prestação de serviço (DPS) da NFS-e padrão nacional.",
        isBlock: true,
        models: ["13"]
    },
    "Rps": {
        description: "Recibo Provisório de Serviços — documento que precede a NFS-e.",
        isBlock: true,
        models: ["13"]
    },
    "InfRps": {
        description: "Informações do RPS.",
        isBlock: true,
        models: ["13"]
    },
    "Numero": {
        description: "Número sequencial do RPS ou da NFS-e.",
        models: ["13"]
    },
    "NumeroNfse": {
        description: "Número da NFS-e emitida.",
        models: ["13"]
    },
    "CodigoVerificacao": {
        description: "Código de verificação da autenticidade da NFS-e.",
        models: ["13"]
    },
    "Servico": {
        description: "Dados do serviço prestado.",
        isBlock: true,
        models: ["13"]
    },
    "ItemListaServico": {
        description: "Código do item da lista de serviços (LC 116/2003). Ex: 1.01, 10.05.",
        models: ["13"]
    },
    "CodigoTributacaoMunicipio": {
        description: "Código de tributação municipal do serviço prestado.",
        models: ["13"]
    },
    "Discriminacao": {
        description: "Descrição detalhada dos serviços prestados (campo livre).",
        models: ["13"]
    },
    "CodigoMunicipio": {
        description: "Código IBGE do município de prestação do serviço.",
        models: ["13"]
    },
    "Prestador": {
        description: "Dados do prestador de serviços.",
        isBlock: true,
        models: ["13"]
    },
    "Tomador": {
        description: "Dados do tomador de serviços.",
        isBlock: true,
        models: ["13"]
    },
    "ValoresNfse": {
        description: "Valores totais da NFS-e.",
        isBlock: true,
        models: ["13"]
    },
    "ValorServicos": {
        description: "**Valor total dos serviços prestados.** Campo dominante da NFS-e.",
        models: ["13"]
    },
    "ValorDeducoes": {
        description: "Valor total das deduções permitidas (materiais, subempreitadas, etc.).",
        models: ["13"]
    },
    "BaseCalculo": {
        description: "Base de cálculo do ISS = Valor dos Serviços - Deduções.",
        models: ["13"]
    },
    "Aliquota": {
        description: "Alíquota do ISS aplicada sobre a base de cálculo.",
        models: ["13"]
    },
    "ValorIss": {
        description: "Valor do ISS calculado.",
        models: ["13"]
    },
    "ValorIssRetido": {
        description: "Valor do ISS retido na fonte pelo tomador.",
        models: ["13"]
    },
    "ValorLiquidoNfse": {
        description: "**Valor líquido da NFS-e** = Valor dos Serviços - ISS Retido - Outras Retenções.",
        models: ["13"]
    },
    "IssRetido": {
        description: "Indica se houve retenção do ISS: **1**=Sim | **2**=Não.",
        models: ["13"]
    },
    "Competencia": {
        description: "Competência (mês/ano) de referência da prestação do serviço no formato AAAA-MM-DD.",
        models: ["13"]
    },
    "ValorPis": {
        description: "Valor do PIS retido pelo tomador.",
        models: ["13"]
    },
    "ValorCofins": {
        description: "Valor da COFINS retida pelo tomador.",
        models: ["13"]
    },
    "ValorInss": {
        description: "Valor do INSS retido pelo tomador.",
        models: ["13"]
    },
    "ValorIr": {
        description: "Valor do IR retido pelo tomador.",
        models: ["13"]
    },
    "ValorCsll": {
        description: "Valor da CSLL retida pelo tomador.",
        models: ["13"]
    }
};
//# sourceMappingURL=nfseDictionary.js.map