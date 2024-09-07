import {
    MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { gerarMTRComplementar };

class gerarMTRComplementar extends ApiRequest {
    private token: MtrWSType.auth.token;
    private dados_mtr_complementar:
        MtrWSType.requestBody.salvarManifestoComplementar;

    constructor(
        dadosParaMTRComplementar:
            MtrWSType.requestBody.salvarManifestoComplementar,
        authToken: MtrWSType.auth.token,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.GERAR_MTR_COMPLEMENTAR);
        this.token = authToken;
        this.dados_mtr_complementar = dadosParaMTRComplementar;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult() {
        const req = await this.makeRequest<
            MtrWSType.requestBody.salvarManifestoComplementar,
            MtrWSType.responseBody.salvarManifestoComplementar
        >({
            method: "POST",
            body: this.dados_mtr_complementar,
            auth: this.token,
        });

        return req;
    }
}
