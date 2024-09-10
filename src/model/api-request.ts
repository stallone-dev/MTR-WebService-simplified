/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service/";

export { ApiRequest };

interface internalRequest<T_request> {
    method: "POST" | "GET";
    pathString?: string;
    body?: T_request | T_request[];
    auth?: MtrWSType.auth.token;
}

/** Modelo-base para construção de requisições à API */
abstract class ApiRequest {
    protected API_URL: URL;

    constructor(BASE_URL: MtrWSBaseURL, API_ROUTE: MtrWSRoute) {
        this.API_URL = new URL(`${BASE_URL}/${API_ROUTE}`);
    }

    /**
     * Função genérica para consumo da API WebService SINIR/SIGOR para MTRs
     * @example
     * const result = await this.makeRequest
     * < MtrWSType.requestBody.consultarMTR,
     * MtrWSType.responseBody.consultarMtr >
     * ({ method: "POST", auth: "Bearer MY_TOKEN", pathString: "1234" });
     */
    protected async makeRequest<T_request, T_response>({
        method,
        pathString,
        body,
        auth,
    }: internalRequest<T_request>): Promise<T_response> {
        /** Modelagem da URL específica da API */
        const _URL = new URL(`${this.API_URL}/${pathString ?? ""}`);

        /** Modelagem da requisição HTTP */
        const options: MtrWSType.httpModel.request = {
            headers: {
                "Content-Type": "application/json",
                Authorization: auth ?? "",
            },
            method: method,
            body: JSON.stringify(body),
        };

        const request = new Request(_URL, options);
        const response = (await fetch(request)).json();

        /** Consumo da API com transformação direta em JSON */
        const result = await response as MtrWSType.httpModel.response;

        /** Verificação dos erros internos da API */
        if (result.erro !== false) {
            throw new Error(result.mensagem as string);
        }

        /** Retorno somente do resultado da requisição */
        return result.objetoResposta as T_response;
    }

    /**
     * Abstração do consumo da função 'makeRequest'
     */
    public abstract getResult(): unknown;
}
