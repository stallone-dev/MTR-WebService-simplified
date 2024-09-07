import {
    MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { downloadCDF };

class downloadCDF extends ApiRequest {
    private token: MtrWSType.auth.token;
    private cdf_id: number;

    constructor(
        cdfID: number,
        authToken: MtrWSType.auth.token,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.DOWNLOAD_CDF);
        this.token = authToken;
        this.cdf_id = cdfID;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult() {
        const req = await this.makeRequest<
            MtrWSType.requestBody.downloadCDF,
            MtrWSType.responseBody.downloadMTR
        >({
            method: "POST",
            pathString: String(this.cdf_id),
            auth: this.token,
        });

        return req;
    }
}
