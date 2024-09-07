import {
    MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { solicitarAlteracaoMTR };

class solicitarAlteracaoMTR extends ApiRequest {
    private token: MtrWSType.auth.token;
    private dados_solicitacao_alteracao:
        MtrWSType.requestBody.solicitarAlteracaoRecebimento;

    constructor(
        dadosSolicitacaoAlteracaoMTR:
            MtrWSType.requestBody.solicitarAlteracaoRecebimento,
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
    public async getResult() {
        const req = await this.makeRequest<
            MtrWSType.requestBody.solicitarAlteracaoRecebimento,
            MtrWSType.responseBody.solicitarAlteracaoRecebimento
        >({
            method: "POST",
            body: this.dados_solicitacao_alteracao,
            auth: this.token,
        });

        return req;
    }
}
