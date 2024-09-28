/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "~model/api-request.ts";

export { downloadMTR };

interface downloadMTRConfig {
    mtrID: string;
    authToken: MtrWSType.auth.token;
    API_BASE_URL: MtrWSBaseURL;
}

class downloadMTR extends ApiRequest {
    private readonly token: MtrWSType.auth.token;
    private readonly mtr_id: string;

    constructor({ mtrID, authToken, API_BASE_URL }: downloadMTRConfig) {
        super(API_BASE_URL, MtrWSRoute.DOWNLOAD_MTR);
        this.token = authToken;
        this.mtr_id = mtrID;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult(): Promise<MtrWSType.responseModel.downloadMTR> {
        const req = await this.makeRequest<
            MtrWSType.requestModel.downloadMTR,
            MtrWSType.responseModel.downloadMTR
        >({
            method: "POST",
            pathString: String(this.mtr_id),
            auth: this.token,
        });

        return req;
    }
}
