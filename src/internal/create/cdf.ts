/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "~model/api-request.ts";

export { gerarCDF };

class gerarCDF extends ApiRequest {
    private token: MtrWSType.auth.token;
    private dados_mtr_para_certificacao: MtrWSType.requestModel.gerarCDF;

    constructor(
        dadosMTRsParaCertificacao: MtrWSType.requestModel.gerarCDF,
        authToken: MtrWSType.auth.token,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.GERAR_CDF);
        this.token = authToken;
        this.dados_mtr_para_certificacao = dadosMTRsParaCertificacao;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult(): Promise<MtrWSType.responseModel.gerarCDF> {
        const req = await this.makeRequest<
            MtrWSType.requestModel.gerarCDF,
            MtrWSType.responseModel.gerarCDF
        >({
            method: "POST",
            body: this.dados_mtr_para_certificacao,
            auth: this.token,
        });

        return req;
    }
}
