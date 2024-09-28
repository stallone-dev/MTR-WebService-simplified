/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "~model/api-request.ts";

export { solicitarAlteracaoRecebimentoMTR };

class solicitarAlteracaoRecebimentoMTR extends ApiRequest {
    private token: MtrWSType.auth.token;
    private dados_solicitacao_alteracao:
        MtrWSType.requestModel.solicitarAlteracaoRecebimentoMTR;

    constructor(
        dadosSolicitacaoAlteracaoMTR:
            MtrWSType.requestModel.solicitarAlteracaoRecebimentoMTR,
        authToken: MtrWSType.auth.token,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.ACEITAR_ALTERACAO_RECEBIMENTO_MTR);
        this.token = authToken;
        this.dados_solicitacao_alteracao = dadosSolicitacaoAlteracaoMTR;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult(): Promise<
        MtrWSType.responseModel.solicitarAlteracaoRecebimentoMTR
    > {
        const req = await this.makeRequest<
            MtrWSType.requestModel.solicitarAlteracaoRecebimentoMTR,
            MtrWSType.responseModel.solicitarAlteracaoRecebimentoMTR
        >({
            method: "POST",
            body: this.dados_solicitacao_alteracao,
            auth: this.token,
        });

        return req;
    }
}
