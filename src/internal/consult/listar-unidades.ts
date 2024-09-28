/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "~model/api-request.ts";

export { listarUnidadesDeMedida };

/** Interface para implementação */
interface listUnidadeDeMedidaConfig {
    authToken: MtrWSType.auth.token;
    API_BASE_URL: MtrWSBaseURL;
}

/**
 * Módulo de listagem das unidades de medida válidas
 *
 * @example
 * ```ts
 *  import { listarUnidadesDeMedida } from "..."
 *  import { MtrWSBaseURL } from "..."
 *
 *  const token = "Bearer _TOKEN_"
 *  const base_url = MtrWSBaseURL.SINIR;
 *
 *  // Preparando a API
 *  const consult = new listarUnidadesDeMedida({
 *      authToken: token,
 *      API_BASE_URL: base_url
 *  });
 *
 *  // Capturando o resultado
 *  const result = await consult.getResult();
 *  // ==> { * Lista-de-unidades-de-medida * }
 * ```
 */
class listarUnidadesDeMedida extends ApiRequest {
    private token: MtrWSType.auth.token;

    constructor({
        authToken,
        API_BASE_URL,
    }: listUnidadeDeMedidaConfig) {
        super(API_BASE_URL, MtrWSRoute.LISTAR_UNIDADES_MEDIDA);
        this.token = authToken;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult(): Promise<
        MtrWSType.responseModel.listarUnidadesMedida
    > {
        const req = await this.makeRequest<
            MtrWSType.requestModel.listarUnidadesMedida,
            MtrWSType.responseModel.listarUnidadesMedida
        >({
            method: "GET",
            auth: this.token,
        });

        return req;
    }
}
