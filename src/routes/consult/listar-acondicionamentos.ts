/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { listarAcondicionamentos };

/** Interface para implementação */
interface listAcondicionamentosConfig {
    authToken: MtrWSType.auth.token;
    API_BASE_URL: MtrWSBaseURL;
}

/**
 * Módulo de listagem das formas de acondicionamento válidas
 *
 * @example
 * ```ts
 * ```
 */
class listarAcondicionamentos extends ApiRequest {
    private token: MtrWSType.auth.token;

    constructor({ authToken, API_BASE_URL }: listAcondicionamentosConfig) {
        super(API_BASE_URL, MtrWSRoute.LISTAR_ACONDICIONAMENTOS);
        this.token = authToken;
    }

    /**
     * Requisição da lista geral de acondicionamentos possíveis na API
     */
    public async getResult(): Promise<
        MtrWSType.responseModel.listarAcondicionamentos
    > {
        const req = await this.makeRequest<
            MtrWSType.requestModel.listarAcondiconamentos,
            MtrWSType.responseModel.listarAcondicionamentos
        >({
            method: "GET",
            auth: this.token,
        });

        return req;
    }
}
