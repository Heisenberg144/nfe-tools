"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cteDictionary = void 0;
exports.cteDictionary = {
    "cteProc": {
        description: "Envelope de processamento do CT-e. Contém o CT-e e o protocolo de autorização.",
        isBlock: true,
        models: ["57", "62"]
    },
    "CTe": {
        description: "Conhecimento de Transporte Eletrônico. Documento fiscal para prestação de serviços de transporte.",
        isBlock: true,
        models: ["57", "62"]
    },
    "infCte": {
        description: "Grupo de informações do CT-e. Contém todos os dados do conhecimento de transporte.",
        isBlock: true,
        models: ["57", "62"]
    },
    "infCTeNorm": {
        description: "Informações do CT-e Normal.",
        isBlock: true,
        models: ["57", "62"]
    },
    "infCarga": {
        description: "Informações da carga transportada no CT-e.",
        isBlock: true,
        models: ["57", "62"]
    },
    "vCarga": {
        description: "Valor total da carga para fins de averbação e seguro.",
        models: ["57", "62"]
    },
    "proPP": {
        description: "Produto Predominante da carga.",
        models: ["57", "62"]
    },
    "infModal": {
        description: "Informações do modal de transporte (rodoviário, aéreo, aquaviário, ferroviário, dutoviário).",
        isBlock: true,
        models: ["57", "62"]
    },
    "vTPrest": {
        description: "**Valor total da prestação do serviço de transporte.** Campo dominante do CT-e.",
        models: ["57", "62"]
    },
    "vRec": {
        description: "Valor a receber pelo transportador.",
        models: ["57", "62"]
    }
};
//# sourceMappingURL=cteDictionary.js.map