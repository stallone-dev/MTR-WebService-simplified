import {
    MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { cancelarLoteMTR };

class cancelarLoteMTR extends ApiRequest {
    private token: MtrWSType.auth.token;
    private dados_para_cancelamento_lote_mtr:
        MtrWSType.requestBody.cancelarLoteMtr[];

    constructor(
        dadosCancelamentoLoteMTR: MtrWSType.requestBody.cancelarMtr[],
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
    public async getResult() {
        const req = await this.makeRequest<
            MtrWSType.requestBody.cancelarLoteMtr,
            MtrWSType.responseBody.cancelarLoteMtr
        >({
            method: "POST",
            body: this.dados_para_cancelamento_lote_mtr,
            auth: this.token,
        });

        return req;
    }
}
