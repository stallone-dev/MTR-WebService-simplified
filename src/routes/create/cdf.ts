import {
    MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { gerarCDF };

class gerarCDF extends ApiRequest {
    private token: MtrWSType.auth.token;
    private dados_mtr_para_certificacao: MtrWSType.requestBody.gerarCdf;

    constructor(
        dadosMTRsParaCertificacao: MtrWSType.requestBody.gerarCdf,
        authToken: MtrWSType.auth.token,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.GERAR_CDF);
        this.token = authToken;
        this.dados_mtr_para_certificacao = dadosMTRsParaCertificacao;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult() {
        const req = await this.makeRequest<
            MtrWSType.requestBody.gerarCdf,
            MtrWSType.responseBody.gerarCdf
        >({
            method: "POST",
            body: this.dados_mtr_para_certificacao,
            auth: this.token,
        });

        return req;
    }
}
