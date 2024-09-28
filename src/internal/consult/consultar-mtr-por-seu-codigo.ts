/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "~model/api-request.ts";

export { consultarMTRPorSeuCodigo };

/** Interface para implementação */
interface consultMTRPorSeuCodigoConfig {
    seuCodigo: MtrWSType.requestModel.retornaMTRsPorSeuCodigo;
    authToken: MtrWSType.auth.token;
    API_BASE_URL: MtrWSBaseURL;
}

/**
 * Módulo de consulta dos dados de um MTR através do "SeuCodigo"
 * @SIGOR_ONLY
 *
 * @example
 * ```ts
 *  import { consultarMtrPorSeuCodigo } from "..."
 *  import { MtrWSBaseURL } from "..."
 *
 *  const token = "Bearer _TOKEN_"
 *  const base_url = MtrWSBaseURL.SINIR;
 *  const seu_codigo = { seuCodigo: "1234", suaUnidade: "1234" }
 *
 *  // Preparando a API
 *  const consult = new consultarMtrPorSeuCodigo({
 *      seuCodigo: seu_codigo,
 *      authToken: token,
 *      API_BASE_URL: base_url
 *  });
 *
 *  // Capturando o resultado
 *  const result = await consult.getResult();
 *  // ==> { * MTR-object * }
 * ```
 */
class consultarMTRPorSeuCodigo extends ApiRequest {
    private token: MtrWSType.auth.token;
    private seu_codigo: MtrWSType.requestModel.retornaMTRsPorSeuCodigo;

    constructor({
        seuCodigo,
        authToken,
        API_BASE_URL,
    }: consultMTRPorSeuCodigoConfig) {
        super(API_BASE_URL, MtrWSRoute.CONSULTAR_MTR_POR_SEU_CODIGO);
        this.token = authToken;
        this.seu_codigo = seuCodigo;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult(): Promise<
        MtrWSType.responseModel.retornaMTRsPorSeuCodigo
    > {
        const req = await this.makeRequest<
            MtrWSType.requestModel.retornaMTRsPorSeuCodigo,
            MtrWSType.responseModel.retornaMTRsPorSeuCodigo
        >({
            method: "POST",
            body: this.seu_codigo,
            auth: this.token,
        });

        return req;
    }
}
