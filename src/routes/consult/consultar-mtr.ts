import {
    MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { getMtrData };

class getMtrData extends ApiRequest {
    private token: MtrWSType.auth.token;
    private mtr: string;

    constructor(
        mtrID: string,
        authToken: MtrWSType.auth.token,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.CONSULTAR_MTR);
        this.token = authToken;
        this.mtr = mtrID;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult(): Promise<MtrWSType.responseBody.consultarMtr> {
        const req = await this.makeRequest<
            MtrWSType.requestBody.consultarMTR,
            MtrWSType.responseBody.consultarMtr
        >({ method: "GET", pathString: this.mtr, auth: this.token });

        return req;
    }
}
