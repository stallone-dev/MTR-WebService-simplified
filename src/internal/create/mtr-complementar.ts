/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "~model/api-request.ts";

export { gerarMTRComplementar };

/** Interface para implementação */
interface gerarMTRComplementarConfig {
    dadosParaMTRComplementar: MtrWSType.requestModel.gerarMTRComplementar;
    authToken: MtrWSType.auth.token;
    API_BASE_URL: MtrWSBaseURL;
}

/**
 * Módulo de geração de MTR complementar
 *
 * @example
 * ```ts
 *  import { gerarLoteMTR } from "..."
 *  import { MtrWSBaseURL } from "..."
 *
 *  const token = "Bearer _TOKEN_"
 *  const base_url = MtrWSBaseURL.SINIR;
 *  const data_to_generate_mtr_compl =
 *
 *  // Preparando a API
 *  const consult = new gerarLoteMTR({
 *      authToken: token,
 *      API_BASE_URL: base_url,
 *      dadosParaMTRComplementar: data_to_generate_mtr_compl,
 *  });
 *
 *  // Capturando o resultado
 *  const result = await consult.getResult();
 *  // ==> { * Resultado da geração do MTR complementar * }
 * ```
 */
class gerarMTRComplementar extends ApiRequest {
    private token: MtrWSType.auth.token;
    private dados_mtr_complementar: MtrWSType.requestModel.gerarMTRComplementar;

    constructor({
        dadosParaMTRComplementar,
        authToken,
        API_BASE_URL,
    }: gerarMTRComplementarConfig) {
        super(API_BASE_URL, MtrWSRoute.GERAR_MTR_COMPLEMENTAR);
        this.token = authToken;
        this.dados_mtr_complementar = dadosParaMTRComplementar;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult(): Promise<
        MtrWSType.responseModel.gerarMTRComplementar
    > {
        const req = await this.makeRequest<
            MtrWSType.requestModel.gerarMTRComplementar,
            MtrWSType.responseModel.gerarMTRComplementar
        >({
            method: "POST",
            body: this.dados_mtr_complementar,
            auth: this.token,
        });

        return req;
    }
}
