import {
    MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { listarClasses };

class listarClasses extends ApiRequest {
    private token: MtrWSType.auth.token;

    constructor(
        authToken: MtrWSType.auth.token,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.LISTAR_CLASSES_RESIDUOS);
        this.token = authToken;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult() {
        const req = await this.makeRequest<
            MtrWSType.requestBody.listarClassesResiduos,
            MtrWSType.responseBody.listarClassesResiduos
        >({
            method: "POST",
            auth: this.token,
        });

        return req;
    }
}
