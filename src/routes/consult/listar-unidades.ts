import {
    MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { listarUnidadesDeMedida };

class listarUnidadesDeMedida extends ApiRequest {
    private token: MtrWSType.auth.token;

    constructor(
        authToken: MtrWSType.auth.token,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.LISTAR_UNIDADES_MEDIDA);
        this.token = authToken;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult() {
        const req = await this.makeRequest<
            MtrWSType.requestBody.listarUnidadesMedida,
            MtrWSType.responseBody.listarUnidadesMedida
        >({
            method: "POST",
            auth: this.token,
        });

        return req;
    }
}
