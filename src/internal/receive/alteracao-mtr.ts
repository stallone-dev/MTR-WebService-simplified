/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "~model/api-request.ts";

export { aceitarAlteracaoMTR };

/** Interface para implementação */
interface aceitarAlteracaoMTRConfig {
    dadosAceiteAlteracaoMTR:
        MtrWSType.requestModel.aceitarAlteracaoRecebimentoMTR;
    authToken: MtrWSType.auth.token;
    API_BASE_URL: MtrWSBaseURL;
}

/**
 * Módulo de geração de MTR complementar
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
 *      API_BASE_URL: base_url,
 *      dadosAceiteAlteracaoMTR: data_to_accept_mtr_change,
 *  });
 *
 *  // Capturando o resultado
 *  const result = await consult.getResult();
 *  // ==> { * Resultado da geração do MTR complementar * }
 * ```
 */
class aceitarAlteracaoMTR extends ApiRequest {
    private token: MtrWSType.auth.token;
    private dados_aceite_alteracao_mtr:
        MtrWSType.requestModel.aceitarAlteracaoRecebimentoMTR;

    constructor({
        dadosAceiteAlteracaoMTR,
        authToken,
        API_BASE_URL,
    }: aceitarAlteracaoMTRConfig) {
        super(API_BASE_URL, MtrWSRoute.ACEITAR_ALTERACAO_RECEBIMENTO_MTR);
        this.token = authToken;
        this.dados_aceite_alteracao_mtr = dadosAceiteAlteracaoMTR;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult(): Promise<
        MtrWSType.responseModel.aceitarAlteracaoRecebimentoMTR
    > {
        const req = await this.makeRequest<
            MtrWSType.requestModel.aceitarAlteracaoRecebimentoMTR,
            MtrWSType.responseModel.aceitarAlteracaoRecebimentoMTR
        >({
            method: "POST",
            body: this.dados_aceite_alteracao_mtr,
            auth: this.token,
        });

        return req;
    }
}
