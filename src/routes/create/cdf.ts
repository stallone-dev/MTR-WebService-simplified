/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "~model/api-request.ts";

export { gerarCDF };

/** Interface para implementação */
interface gerarCDFConfig {
    dadosMTRsParaCertificacao: MtrWSType.requestModel.gerarCDF;
    authToken: MtrWSType.auth.token;
    API_BASE_URL: MtrWSBaseURL;
}

/**
 * Módulo de geração de CDF com base em MTRs já recebidos
 *
 * @example
 * ```ts
 *  import { gerarCDF } from "..."
 *  import { MtrWSBaseURL } from "..."
 *
 *  const token = "Bearer _TOKEN_"
 *  const base_url = MtrWSBaseURL.SINIR;
 *  const data_cdf = {
 *    cerDataInicial: 123141,
 *    cerDataFinal: 123142131,
 *    cnpjDestinador: "11111111111",
 *    nomeResponsavel: "Teste owner",
 *    parceiroDestinador: 130204,
 *    tipoCertificadoDestinacao: 1,
 *    listaParceiroGerador: [{ cpfCnpj: "11111111111", unidade: 130204 }],
 *    cerObservacao: "Teste of generate CDF",
 * }
 *
 *  // Preparando a API
 *  const consult = new gerarCDF({
 *      authToken: token,
 *      API_BASE_URL: base_url,
 *      dadosMTRsParaCertificacao: data_cdf,
 *  });
 *
 *  // Capturando o resultado
 *  const result = await consult.getResult();
 *  // ==> { * Resultado da geração do CDFs * }
 * ```
 */
class gerarCDF extends ApiRequest {
    private token: MtrWSType.auth.token;
    private dados_mtr_para_certificacao: MtrWSType.requestModel.gerarCDF;

    constructor({
        dadosMTRsParaCertificacao,
        authToken,
        API_BASE_URL,
    }: gerarCDFConfig) {
        super(API_BASE_URL, MtrWSRoute.GERAR_CDF);
        this.token = authToken;
        this.dados_mtr_para_certificacao = dadosMTRsParaCertificacao;
    }

    /**
     * Gerar resultado
     */
    public async getResult(): Promise<MtrWSType.responseModel.gerarCDF> {
        const req = await this.makeRequest<
            MtrWSType.requestModel.gerarCDF,
            MtrWSType.responseModel.gerarCDF
        >({
            method: "POST",
            body: this.dados_mtr_para_certificacao,
            auth: this.token,
        });

        return req;
    }
}
