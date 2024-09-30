import { solicitarAlteracaoRecebimentoMTR } from "~internal/create/alteracao-mtr.ts";
import { gerarCDF } from "~internal/create/cdf.ts";
import { gerarLoteMTR } from "~internal/create/lote-mtr.ts";
import { gerarMTRComplementar } from "~internal/create/mtr-complementar.ts";

export const _create = {
    gerarCDF,
    gerarLoteMTR,
    gerarMTRComplementar,
    solicitarAlteracaoRecebimentoMTR,
};
