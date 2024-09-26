/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { listarResiduos };

/** Interface para implementação */
interface listResiduosConfig {
    authToken: MtrWSType.auth.token;
    API_BASE_URL: MtrWSBaseURL;
}

/**
 * Módulo de listagem dos resíduos existentes
 *
 * @example
 * ```ts
 *  import { listarResiduos } from "..."
 *  import { MtrWSBaseURL } from "..."
 *
 *  const token = "Bearer _TOKEN_"
 *  const base_url = MtrWSBaseURL.SINIR;
 *
 *  // Preparando a API
 *  const consult = new listarResiduos({
 *      authToken: token,
 *      API_BASE_URL: base_url
 *  });
 *
 *  // Capturando o resultado
 *  const result = await consult.getResult();
 *  // ==> { * Lista-de-residuos * }
 * ```
 */
class listarResiduos extends ApiRequest {
    private token: MtrWSType.auth.token;

    constructor({ authToken, API_BASE_URL }: listResiduosConfig) {
        super(API_BASE_URL, MtrWSRoute.LISTAR_RESIDUOS);
        this.token = authToken;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult(): Promise<MtrWSType.responseModel.listarResiduos> {
        const req = await this.makeRequest<
            MtrWSType.requestModel.listarResiduos,
            MtrWSType.responseModel.listarResiduos
        >({
            method: "GET",
            auth: this.token,
        });

        return req;
    }
}
