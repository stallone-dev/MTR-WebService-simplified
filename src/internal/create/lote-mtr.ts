/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "~model/api-request.ts";

export { gerarLoteMTR };

class gerarLoteMTR extends ApiRequest {
    private token: MtrWSType.auth.token;
    private dados_para_emissao_lote_mtr: MtrWSType.requestModel.gerarLoteMTR[];

    constructor(
        dadosParaEmissaoLoteMTR: MtrWSType.requestModel.gerarLoteMTR[],
        authToken: MtrWSType.auth.token,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.GERAR_MTR);
        this.token = authToken;
        this.dados_para_emissao_lote_mtr = dadosParaEmissaoLoteMTR;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult(): Promise<MtrWSType.responseModel.gerarLoteMTR> {
        const req = await this.makeRequest<
            MtrWSType.requestModel.gerarLoteMTR,
            MtrWSType.responseModel.gerarLoteMTR
        >({
            method: "POST",
            body: this.dados_para_emissao_lote_mtr,
            auth: this.token,
        });

        return req;
    }
}
