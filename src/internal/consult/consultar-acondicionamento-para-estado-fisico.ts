/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "~model/api-request.ts";

export { consultarAcondicionamentoParaEstadoFisico };

/** Interface para implementação */
interface consultAcondicionamentoParaEstadoFisicoConfig {
    codEstadoFisico: number;
    authToken: MtrWSType.auth.token;
    API_BASE_URL: MtrWSBaseURL;
}

/**
 * Módulo de donsulta dos tipos de acondicionamento disponíveis para um determinado código de estado físico
 *
 * @example
 * ```ts
 *  import { consultarAcondicionamentoParaEstadoFisico } from "..."
 *  import { MtrWSBaseURL } from "..."
 *
 *  const token = "Bearer _TOKEN_"
 *  const base_url = MtrWSBaseURL.SINIR;
 *  const cod_estado = "1"
 *
 *  // Preparando a API
 *  const consult = new consultarAcondicionamentoParaEstadoFisico({
 *      codEstadoFisico: cod_estado,
 *      authToken: token,
 *      API_BASE_URL: base_url
 *  });
 *
 *  // Capturando o resultado
 *  const result = await consult.getResult();
 *  // ==> { * Lista-acondicionamentos-compatíveis * }
 * ```
 */
class consultarAcondicionamentoParaEstadoFisico extends ApiRequest {
    private token: MtrWSType.auth.token;
    private estado_fisico_ID: number;

    constructor({
        codEstadoFisico,
        authToken,
        API_BASE_URL,
    }: consultAcondicionamentoParaEstadoFisicoConfig) {
        super(
            API_BASE_URL,
            MtrWSRoute.CONSULTAR_ACONDICIONAMENTOS_PARA_ESTADO_FISICO,
        );
        this.token = authToken;
        this.estado_fisico_ID = codEstadoFisico;
    }

    /**
     * Resultado da consulta de acondicionamentos disponíveis para um determinado estado físico
     */
    public async getResult(): Promise<
        MtrWSType.responseModel.consultarAcondicionamentosParaEstadoFisico
    > {
        const req = await this.makeRequest<
            MtrWSType.requestModel.consultarAcondicionamentosParaEstadoFisico,
            MtrWSType.responseModel.consultarAcondicionamentosParaEstadoFisico
        >({
            method: "GET",
            pathString: String(this.estado_fisico_ID),
            auth: this.token,
        });

        return req;
    }
}
