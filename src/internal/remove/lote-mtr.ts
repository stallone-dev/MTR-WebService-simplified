/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { cancelarLoteMTR };

class cancelarLoteMTR extends ApiRequest {
    private token: MtrWSType.auth.token;
    private dados_para_cancelamento_lote_mtr:
        MtrWSType.requestModel.cancelarLoteMTR[];

    constructor(
        dadosCancelamentoLoteMTR: MtrWSType.requestModel.cancelarLoteMTR[],
        authToken: MtrWSType.auth.token,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.CANCELAR_LOTE_MTR);
        this.token = authToken;
        this.dados_para_cancelamento_lote_mtr = dadosCancelamentoLoteMTR;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult(): Promise<MtrWSType.responseModel.cancelarLoteMTR> {
        const req = await this.makeRequest<
            MtrWSType.requestModel.cancelarLoteMTR,
            MtrWSType.responseModel.cancelarLoteMTR
        >({
            method: "POST",
            body: this.dados_para_cancelamento_lote_mtr,
            auth: this.token,
        });

        return req;
    }
}
