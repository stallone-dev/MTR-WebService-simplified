import { consultarDadosDoMTR } from "~route/consult/consultar-mtr.ts";
import { consultarClasseParaCodIBAMA } from "~route/consult/consultar-classe-para-cod-ibama.ts";
import { consultarAcondicionamentoParaEstadoFisico } from "~route/consult/consultar-acondicionamento-para-estado-fisico.ts";
import { consultarMTRPorSeuCodigo } from "~route/consult/consultar-mtr-por-seu-codigo.ts";
import { listarAcondicionamentos } from "~route/consult/listar-acondicionamentos.ts";
import { listarClasses } from "~route/consult/listar-classes.ts";
import { listarEstadosFisicos } from "~route/consult/listar-estados-fisicos.ts";
import { listarTratamentos } from "~route/consult/listar-tratamentos.ts";
import { listarUnidadesDeMedida } from "~route/consult/listar-unidades.ts";
import { listarResiduos } from "~route/consult/listar-residuos-ibama.ts";

export const consult = {
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
