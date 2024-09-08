/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { gerarAuthToken };

/**
 * Geração de um token de acesso para consumo das APIs
 */
class gerarAuthToken extends ApiRequest {
    private readonly credentials: MtrWSType.auth.credentials;

    constructor(
        credentialsData: MtrWSType.auth.credentials,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.GERAR_TOKEN);
        this.credentials = credentialsData;
    }

    /**
     * Geração de um token de acesso para uso da API
     */
    public async getResult() {
        const req = await this.makeRequest<
            MtrWSType.requestConfig.gerarAuthToken,
            MtrWSType.responseConfig.gerarAuthToken
        >({ method: "POST", body: this.credentials });

        return req;
    }
}
