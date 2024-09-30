/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { gerarAuthToken };

/** Interface para implementação */
interface authConfig {
    credentials: MtrWSType.auth.credentials;
    API_BASE_URL: MtrWSBaseURL;
}

/**
 * Módulo de geração do Token de acesso da API
 *
 * @example
 * ```ts
 *  import { gerarAuthToken } from "..."
 *  import { MtrWSBaseURL } from "..."
 *
 *  const credentials = { cpfCnpj:"123...", senha:"abc...", unidade:"123..." }
 *  const base_url = MtrWSBaseURL.SINIR;
 *
 *  // Preparando a API
 *  const consult = new gerarAuthToken({
 *      credentials: credentials,
 *      API_BASE_URL: base_url
 *  });
 *
 *  // Gerando o token de acesso
 *  const result = await consult.getResult();
 *  // ==> Bearer _TOKEN_
 * ```
 */
class gerarAuthToken extends ApiRequest {
    private readonly credentials: MtrWSType.auth.credentials;

    constructor({ credentials, API_BASE_URL }: authConfig) {
        super(API_BASE_URL, MtrWSRoute.GERAR_TOKEN);
        this.credentials = credentials;
    }

    /**
     * Requisição do Token de acesso da API
     */
    public async getResult(): Promise<MtrWSType.responseModel.gerarAuthToken> {
        const req = await this.makeRequest<
            MtrWSType.requestModel.gerarAuthToken,
            MtrWSType.responseModel.gerarAuthToken
        >({ method: "POST", body: this.credentials });

        return req;
    }
}
