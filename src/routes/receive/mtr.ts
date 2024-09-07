import {
    MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { receberLoteMTR };

class receberLoteMTR extends ApiRequest {
    private token: MtrWSType.auth.token;
    private dados_mtr_para_recebimento: MtrWSType.requestBody.receberLoteMtr[];

    constructor(
        dadosParaRecebimentoMTR: MtrWSType.requestBody.receberLoteMtr[],
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
    public async getResult() {
        const req = await this.makeRequest<
            MtrWSType.requestBody.receberLoteMtr,
            MtrWSType.responseBody.receberLoteMtr
        >({
            method: "POST",
            body: this.dados_mtr_para_recebimento,
            auth: this.token,
        });

        return req;
    }
}
