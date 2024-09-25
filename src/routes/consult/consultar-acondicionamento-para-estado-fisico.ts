/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { consultarAcondicionamentoParaEstadoFisico };

/**
 * Consulta dos tipos de acondicionamento disponíveis para um determinado código de estado físico
 */
class consultarAcondicionamentoParaEstadoFisico extends ApiRequest {
    private token: MtrWSType.auth.token;
    private estado_fisico_ID: number;

    constructor(
        codEstadoFisico: number,
        authToken: MtrWSType.auth.token,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.CONSULTAR_MTR);
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
            method: "POST",
            pathString: String(this.estado_fisico_ID),
            auth: this.token,
        });

        return req;
    }
}
