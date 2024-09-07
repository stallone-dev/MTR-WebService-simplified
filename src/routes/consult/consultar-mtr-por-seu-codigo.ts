import {
    MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { consultarMtrPorSeuCodigo };

class consultarMtrPorSeuCodigo extends ApiRequest {
    private token: MtrWSType.auth.token;
    private seu_codigo: MtrWSType.requestBody.retornaManifestoSeuCodigo;

    constructor(
        seuCodigo: MtrWSType.requestBody.retornaManifestoSeuCodigo,
        authToken: MtrWSType.auth.token,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.CONSULTAR_MTR_POR_SEU_CODIGO);
        this.token = authToken;
        this.seu_codigo = seuCodigo;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult() {
        const req = await this.makeRequest<
            MtrWSType.requestBody.retornaManifestoSeuCodigo,
            MtrWSType.responseBody.consultarMtr
        >({
            method: "POST",
            body: this.seu_codigo,
            auth: this.token,
        });

        return req;
    }
}
