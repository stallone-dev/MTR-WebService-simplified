/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { consultarDadosDoMTR };

/** Interface para implementação */
interface consultMTRConfig {
    mtrID: string;
    authToken: MtrWSType.auth.token;
    API_BASE_URL: MtrWSBaseURL;
}

/**
 * Módulo de consulta dos dados completos de uma MTR
 *
 * @example
 * ```ts
 *  import { consultarDadosDoMTR } from "..."
 *  import { MtrWSBaseURL } from "..."
 *
 *  const token = "Bearer _TOKEN_"
 *  const base_url = MtrWSBaseURL.SINIR;
 *
 *  // Preparando a API
 *  const consult = new consultarDadosDoMTR({
 *      mtrID: "1234123412",
 *      authToken: token,
 *      API_BASE_URL: base_url
 *  });
 *
 *  // Capturando o resultado
 *  const result = await consult.getResult();
 *  // ==> { * MTR-object * }
 * ```
 */
class consultarDadosDoMTR extends ApiRequest {
    private readonly token: MtrWSType.auth.token;
    private readonly mtr: string;

    constructor({ mtrID, authToken, API_BASE_URL }: consultMTRConfig) {
        super(API_BASE_URL, MtrWSRoute.CONSULTAR_MTR);
        this.token = authToken;
        this.mtr = mtrID;
    }

    /**
     * Requisição do dados atuais de um determinado MTR
     */
    public async getResult(): Promise<MtrWSType.responseModel.consultarMTR> {
        const req = await this.makeRequest<
            MtrWSType.requestModel.consultarMTR,
            MtrWSType.responseModel.consultarMTR
        >({
            method: "GET",
            pathString: this.mtr,
            auth: this.token,
        });

        return req;
    }
}
