/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "~model/api-request.ts";

export { gerarLoteMTR };

/** Interface para implementação */
interface gerarLoteMTRConfig {
    dadosParaEmissaoLoteMTR: MtrWSType.requestModel.gerarLoteMTR[];
    authToken: MtrWSType.auth.token;
    API_BASE_URL: MtrWSBaseURL;
}

/**
 * Módulo de geração de MTRs
 *
 * @example
 * ```ts
 *  import { gerarLoteMTR } from "..."
 *  import { MtrWSBaseURL } from "..."
 *
 *  const token = "Bearer _TOKEN_"
 *  const base_url = MtrWSBaseURL.SINIR;
 *  const data_to_generate_mtr =
 *
 *  // Preparando a API
 *  const consult = new gerarLoteMTR({
 *      authToken: token,
 *      API_BASE_URL: base_url,
 *      dadosParaEmissaoLoteMTR: data_to_generate_mtr,
 *  });
 *
 *  // Capturando o resultado
 *  const result = await consult.getResult();
 *  // ==> { * Resultado da geração dos MTRs * }
 * ```
 */
class gerarLoteMTR extends ApiRequest {
    private token: MtrWSType.auth.token;
    private dados_para_emissao_lote_mtr: MtrWSType.requestModel.gerarLoteMTR[];

    constructor({
        dadosParaEmissaoLoteMTR,
        authToken,
        API_BASE_URL,
    }: gerarLoteMTRConfig) {
        super(API_BASE_URL, MtrWSRoute.GERAR_MTR);
        this.token = authToken;
        this.dados_para_emissao_lote_mtr = dadosParaEmissaoLoteMTR;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult(): Promise<MtrWSType.responseModel.gerarLoteMTR> {
        const req = await this.makeRequest<
            MtrWSType.requestModel.gerarLoteMTR,
            MtrWSType.responseModel.gerarLoteMTR
        >({
            method: "POST",
            body: this.dados_para_emissao_lote_mtr,
            auth: this.token,
        });

        return req;
    }
}
