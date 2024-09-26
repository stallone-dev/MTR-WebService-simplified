import { solicitarAlteracaoRecebimentoMTR } from "~route/create/alteracao-mtr.ts";
import { gerarCDF } from "~route/create/cdf.ts";
import { gerarLoteMTR } from "~route/create/lote-mtr.ts";
import { gerarMTRComplementar } from "~route/create/mtr-complementar.ts";

export const create = {
    gerarCDF,
    gerarLoteMTR,
    gerarMTRComplementar,
    solicitarAlteracaoRecebimentoMTR,
};
