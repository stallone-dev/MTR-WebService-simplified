import { consultarDadosDoMTR } from "~internal/consult/consultar-mtr.ts";
import { consultarClasseParaCodIBAMA } from "~internal/consult/consultar-classe-para-cod-ibama.ts";
import { consultarAcondicionamentoParaEstadoFisico } from "~internal/consult/consultar-acondicionamento-para-estado-fisico.ts";
import { consultarMTRPorSeuCodigo } from "~internal/consult/consultar-mtr-por-seu-codigo.ts";
import { listarAcondicionamentos } from "~internal/consult/listar-acondicionamentos.ts";
import { listarClasses } from "~internal/consult/listar-classes.ts";
import { listarEstadosFisicos } from "~internal/consult/listar-estados-fisicos.ts";
import { listarTratamentos } from "~internal/consult/listar-tratamentos.ts";
import { listarUnidadesDeMedida } from "~internal/consult/listar-unidades.ts";
import { listarResiduos } from "~internal/consult/listar-residuos-ibama.ts";

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
