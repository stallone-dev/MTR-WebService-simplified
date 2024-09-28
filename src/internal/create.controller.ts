import { solicitarAlteracaoRecebimentoMTR } from "./create/alteracao-mtr.ts";
import { gerarCDF } from "./create/cdf.ts";
import { gerarLoteMTR } from "./create/lote-mtr.ts";
import { gerarMTRComplementar } from "./create/mtr-complementar.ts";

export const _create = {
    gerarCDF,
    gerarLoteMTR,
    gerarMTRComplementar,
    solicitarAlteracaoRecebimentoMTR,
};
