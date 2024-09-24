/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import type {
    MtrWSBaseURL,
    MtrWSRoute,
    MtrWSType,
} from "@stallone-dev/types-mtr-web-service/";

export { ApiRequest };

/**
 * Interface principal para configurar as chamadas à API
 */
interface internalRequest<T_req_model> {
    /** Exigência para definição do tipo de consumo da API */
    method: "POST" | "GET";

    /** Caso seja uma API que use pathString */
    pathString?: string;

    /** Em caso de uma API que exiga um body */
    body?: T_req_model | T_req_model[];

    /** Para o caso de exigência do token de acesso */
    auth?: MtrWSType.auth.token;
}

/** Modelo-base para construção de requisições à API */
abstract class ApiRequest {
    protected API_URL: URL;

    constructor(BASE_URL: MtrWSBaseURL, API_ROUTE: MtrWSRoute) {
        this.API_URL = new URL(`${BASE_URL}/${API_ROUTE}`);
    }

    /**
     * Função genérica para consumo da API WebService SINIR/SIGOR
     *
     * @example
     * ```ts
     *  async getResult(){
     *      await this.makeRequest
     *          < MtrWSType.requestModel.consultarMTR,
     *          MtrWSType.responseModel.consultarMTR >
     *      ({ method: "POST", auth: "Bearer MY_TOKEN", pathString: "1234" });
     *  }
     * ```
     */
    protected async makeRequest<T_req_model, T_resp_model>({
        method,
        pathString,
        body,
        auth,
    }: internalRequest<T_req_model>): Promise<T_resp_model> {
        /** Modelagem da URL da API */
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
        return result.objetoResposta as T_resp_model;
    }

    /**
     * Abstração para implementação da função interna 'makeRequest'
     */
    public abstract getResult(): unknown;
}
