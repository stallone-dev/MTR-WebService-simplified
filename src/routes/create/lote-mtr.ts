import {
    MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { gerarLoteMTR };

class gerarLoteMTR extends ApiRequest {
    private token: MtrWSType.auth.token;
    private dados_para_emissao_lote_mtr: MtrWSType.requestBody.gerarLoteMtr[];

    constructor(
        dadosParaEmissaoLoteMTR: MtrWSType.requestBody.gerarLoteMtr[],
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
    public async getResult() {
        const req = await this.makeRequest<
            MtrWSType.requestBody.gerarLoteMtr,
            MtrWSType.responseBody.gerarLoteMtr
        >({
            method: "POST",
            body: this.dados_para_emissao_lote_mtr,
            auth: this.token,
        });

        return req;
    }
}
