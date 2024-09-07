import {
    MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { aceitarAlteracaoMTR };

class aceitarAlteracaoMTR extends ApiRequest {
    private token: MtrWSType.auth.token;
    private dados_aceite_alteracao_mtr:
        MtrWSType.requestBody.aceitarAlteracaoRecebimento;

    constructor(
        dadosAceiteAlteracaoMTR:
            MtrWSType.requestBody.aceitarAlteracaoRecebimento,
        authToken: MtrWSType.auth.token,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.ACEITAR_ALTERACAO_RECEBIMENTO_MTR);
        this.token = authToken;
        this.dados_aceite_alteracao_mtr = dadosAceiteAlteracaoMTR;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult() {
        const req = await this.makeRequest<
            MtrWSType.requestBody.aceitarAlteracaoRecebimento,
            MtrWSType.responseBody.aceitarAlteracaoRecebimento
        >({
            method: "POST",
            body: this.dados_aceite_alteracao_mtr,
            auth: this.token,
        });

        return req;
    }
}
