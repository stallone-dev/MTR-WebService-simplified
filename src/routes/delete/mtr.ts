import {
    MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { cancelarMTR };

class cancelarMTR extends ApiRequest {
    private token: MtrWSType.auth.token;
    private dados_para_cancelamento_mtr: MtrWSType.requestBody.cancelarMtr;

    constructor(
        dadosParaCancelamentoMTR: MtrWSType.requestBody.cancelarMtr,
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
    public async getResult() {
        const req = await this.makeRequest<
            MtrWSType.requestBody.cancelarMtr,
            MtrWSType.responseBody.cancelarMtr
        >({
            method: "POST",
            body: this.dados_para_cancelamento_mtr,
            auth: this.token,
        });

        return req;
    }
}
