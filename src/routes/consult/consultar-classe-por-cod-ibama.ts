import {
    MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { consultarClassePorCodIBAMA };

class consultarClassePorCodIBAMA extends ApiRequest {
    private token: MtrWSType.auth.token;
    private residuo_ID: string;

    constructor(
        codigoResiduo: string,
        authToken: MtrWSType.auth.token,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.CONSULTAR_CLASSES_POR_COD_IBAMA);
        this.token = authToken;
        this.residuo_ID = codigoResiduo;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult() {
        const req = await this.makeRequest<
            MtrWSType.requestBody.consultarClassesPorCodIbama,
            MtrWSType.responseBody.consultarClassesPorCodIbama
        >({
            method: "POST",
            pathString: this.residuo_ID,
            auth: this.token,
        });

        return req;
    }
}
