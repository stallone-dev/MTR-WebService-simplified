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

class cancelarMTR extends ApiRequest {
    private token: MtrWSType.auth.token;
    private dados_para_cancelamento_mtr: MtrWSType.requestModel.cancelarMTR;

    constructor(
        dadosParaCancelamentoMTR: MtrWSType.requestModel.cancelarMTR,
        authToken: MtrWSType.auth.token,
        API_BASE_URL: MtrWSBaseURL,
    ) {
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
