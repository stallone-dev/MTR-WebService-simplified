/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
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
