/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "~model/api-request.ts";

export { receberLoteMTR };

class receberLoteMTR extends ApiRequest {
    private token: MtrWSType.auth.token;
    private dados_mtr_para_recebimento: MtrWSType.requestModel.receberLoteMTR[];

    constructor(
        dadosParaRecebimentoMTR: MtrWSType.requestModel.receberLoteMTR[],
        authToken: MtrWSType.auth.token,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.RECEBER_LOTE_DE_MTRS);
        this.token = authToken;
        this.dados_mtr_para_recebimento = dadosParaRecebimentoMTR;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult(): Promise<MtrWSType.responseModel.receberLoteMTR> {
        const req = await this.makeRequest<
            MtrWSType.requestModel.receberLoteMTR,
            MtrWSType.responseModel.receberLoteMTR
        >({
            method: "POST",
            body: this.dados_mtr_para_recebimento,
            auth: this.token,
        });

        return req;
    }
}
