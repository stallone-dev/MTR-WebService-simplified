import {
    MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { listarEstadosFisicos };

class listarEstadosFisicos extends ApiRequest {
    private token: MtrWSType.auth.token;

    constructor(
        authToken: MtrWSType.auth.token,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.LISTAR_ESTADOS_FISICOS);
        this.token = authToken;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult() {
        const req = await this.makeRequest<
            MtrWSType.requestBody.listarEstadsoFisicos,
            MtrWSType.responseBody.listarEstadosFisicos
        >({
            method: "POST",
            auth: this.token,
        });

        return req;
    }
}
