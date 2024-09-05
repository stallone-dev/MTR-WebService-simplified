import {
    MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { getAuthToken };

class getAuthToken extends ApiRequest {
    private login: MtrWSType.auth.request;

    constructor(
        loginData: MtrWSType.auth.request,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.GERAR_TOKEN);
        this.login = loginData;
    }

    /**
     * Geração de um token de acesso para uso da API
     */
    public async getResult(): Promise<MtrWSType.responseBody.gerarToken> {
        const req = await this.makeRequest<
            MtrWSType.requestBody.gerarToken,
            MtrWSType.responseBody.gerarToken
        >({ method: "POST", body: this.login });

        return req;
    }
}
