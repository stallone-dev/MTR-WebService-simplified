/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { consultarClasseParaCodIBAMA };

/** Interface para implementação */
interface consultClassePorCodIBAMAConfig {
    codigoResiduo: string;
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
class consultarClasseParaCodIBAMA extends ApiRequest {
    private token: MtrWSType.auth.token;
    private residuo_ID: string;

    constructor({
        codigoResiduo,
        authToken,
        API_BASE_URL,
    }: consultClassePorCodIBAMAConfig) {
        super(API_BASE_URL, MtrWSRoute.CONSULTAR_CLASSES_PARA_COD_IBAMA);
        this.token = authToken;
        this.residuo_ID = codigoResiduo;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult(): Promise<
        MtrWSType.responseModel.consultarClassesParaCodIBAMA
    > {
        const req = await this.makeRequest<
            MtrWSType.requestModel.consultarClassesParaCodIBAMA,
            MtrWSType.responseModel.consultarClassesParaCodIBAMA
        >({
            method: "GET",
            pathString: this.residuo_ID,
            auth: this.token,
        });

        return req;
    }
}
