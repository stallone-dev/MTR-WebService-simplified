/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "~model/api-request.ts";

export { cancelarMTR };

/** Interface para implementação */
interface cancelarMTRConfig {
    dadosParaCancelamentoMTR: MtrWSType.requestModel.cancelarMTR;
    authToken: MtrWSType.auth.token;
    API_BASE_URL: MtrWSBaseURL;
}

/**
 * Módulo de cancelamento de MTRs
 *
 * @example
 * ```ts
 *  import { aceitarAlteracaoMTR } from "..."
 *  import { MtrWSBaseURL } from "..."
 *
 *  const token = "Bearer _TOKEN_"
 *  const base_url = MtrWSBaseURL.SINIR;
 *  const data_to_accept_mtr_change =
 *
 *  // Preparando a API
 *  const consult = new aceitarAlteracaoMTR({
 *      authToken: token,
 *      dadosAceiteAlteracaoMTR: data_to_accept_mtr_change,
 *  });
 *
 *  // Capturando o resultado
 *  const result = await consult.getResult();
 *  // ==> { * Resultado da geração do MTR complementar * }
 * ```
 */
class cancelarMTR extends ApiRequest {
    private token: MtrWSType.auth.token;
    private dados_para_cancelamento_mtr: MtrWSType.requestModel.cancelarMTR;

    constructor({
        dadosParaCancelamentoMTR,
        authToken,
        API_BASE_URL,
    }: cancelarMTRConfig) {
        super(API_BASE_URL, MtrWSRoute.CANCELAR_MTR);
        this.token = authToken;
        this.dados_para_cancelamento_mtr = dadosParaCancelamentoMTR;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult(): Promise<MtrWSType.responseModel.cancelarMTR> {
        const req = await this.makeRequest<
            MtrWSType.requestModel.cancelarMTR,
            MtrWSType.responseModel.cancelarMTR
        >({
            method: "POST",
            body: this.dados_para_cancelamento_mtr,
            auth: this.token,
        });

        return req;
    }
}
