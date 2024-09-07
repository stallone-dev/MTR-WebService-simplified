import {
    MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { downloadMTR };

class downloadMTR extends ApiRequest {
    private token: MtrWSType.auth.token;
    private mtr_id: number;

    constructor(
        mtrID: number,
        authToken: MtrWSType.auth.token,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.DOWNLOAD_MTR);
        this.token = authToken;
        this.mtr_id = mtrID;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult() {
        const req = await this.makeRequest<
            MtrWSType.requestBody.downloadMTR,
            MtrWSType.responseBody.downloadMTR
        >({
            method: "POST",
            pathString: String(this.mtr_id),
            auth: this.token,
        });

        return req;
    }
}
