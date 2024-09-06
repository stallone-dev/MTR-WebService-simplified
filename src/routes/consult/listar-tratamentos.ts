import {
    MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { listarTratamentos };

class listarTratamentos extends ApiRequest {
    private token: MtrWSType.auth.token;

    constructor(
        authToken: MtrWSType.auth.token,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.LISTAR_TRATAMENTOS);
        this.token = authToken;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult() {
        const req = await this.makeRequest<
            MtrWSType.requestBody.listarTratamentos,
            MtrWSType.responseBody.listarTratamentos
        >({
            method: "POST",
            auth: this.token,
        });

        return req;
    }
}
