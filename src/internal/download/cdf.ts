/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "~model/api-request.ts";

export { downloadCDF };

interface downloadCDFConfig {
    cdfID: number;
    authToken: MtrWSType.auth.token;
    API_BASE_URL: MtrWSBaseURL;
}

class downloadCDF extends ApiRequest {
    private token: MtrWSType.auth.token;
    private cdf_id: number;

    constructor({ cdfID, authToken, API_BASE_URL }: downloadCDFConfig) {
        super(API_BASE_URL, MtrWSRoute.DOWNLOAD_CDF);
        this.token = authToken;
        this.cdf_id = cdfID;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult(): Promise<MtrWSType.responseModel.downloadCDF> {
        const req = await this.makeRequest<
            MtrWSType.requestModel.downloadCDF,
            MtrWSType.responseModel.downloadCDF
        >({
            method: "POST",
            pathString: String(this.cdf_id),
            auth: this.token,
        });

        return req;
    }
}
