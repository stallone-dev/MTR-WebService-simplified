import { consultarDadosDoMTR } from "./consult/consultar-mtr.ts";
import { consultarClasseParaCodIBAMA } from "./consult/consultar-classe-para-cod-ibama.ts";
import { consultarAcondicionamentoParaEstadoFisico } from "./consult/consultar-acondicionamento-para-estado-fisico.ts";
import { consultarMTRPorSeuCodigo } from "./consult/consultar-mtr-por-seu-codigo.ts";
import { listarAcondicionamentos } from "./consult/listar-acondicionamentos.ts";
import { listarClasses } from "./consult/listar-classes.ts";
import { listarEstadosFisicos } from "./consult/listar-estados-fisicos.ts";
import { listarTratamentos } from "./consult/listar-tratamentos.ts";
import { listarUnidadesDeMedida } from "./consult/listar-unidades.ts";
import { listarResiduos } from "./consult/listar-residuos-ibama.ts";

export const _consult = {
    listarResiduos,
    listarClasses,
    listarAcondicionamentos,
    listarEstadosFisicos,
    listarTratamentos,
    listarUnidadesDeMedida,
    consultarClasseParaCodIBAMA,
    consultarDadosDoMTR,
    consultarAcondicionamentoParaEstadoFisico,
    consultarMTRPorSeuCodigo,
};
