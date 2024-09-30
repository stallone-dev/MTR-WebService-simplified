/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "~model/api-request.ts";

export { solicitarAlteracaoRecebimentoMTR };

/** Interface para implementação */
interface solicitarAlteracaoRecebimentoMTRConfig {
    dadosSolicitacaoAlteracaoMTR:
        MtrWSType.requestModel.solicitarAlteracaoRecebimentoMTR;
    authToken: MtrWSType.auth.token;
    API_BASE_URL: MtrWSBaseURL;
}

/**
 * Módulo de solicitação de alteração de um MTR já recebido
 *
 * @example
 * ```ts
 *  import { solicitarAlteracaoRecebimentoMTR } from "..."
 *  import { MtrWSBaseURL } from "..."
 *
 *  const token = "Bearer _TOKEN_"
 *  const base_url = MtrWSBaseURL.SINIR;
 *  const data_mtr = {
 *       parCodigoDestinador: "12345",
 *       remObservacao: "Teste de alteração de MTR",
 *       manifesto: {
 *           manNumero: "12345",
 *           listaManifestoResiduo: [
 *               {
 *                   claCodigo: 12,
 *                   claCodigoNovo: 13, // Alteração da classe
 *                   marQuantidade: 0.006,
 *                   marQuantidadeRecebida: 6.0, // Alteração da qnt recebida
 *                   resCodigoIbama: "170107",
 *                   traCodigo: 1,
 *                   traCodigoNovo: 2, // Alteração do tratamento
 *               },
 *           ],
 *       },
 *  }
 *
 *  // Preparando a API
 *  const consult = new solicitarAlteracaoRecebimentoMTR({
 *      authToken: token,
 *      API_BASE_URL: base_url,
 *      dadosSolicitacaoAlteracaoMTR: data_mtr,
 *  });
 *
 *  // Capturando o resultado
 *  const result = await consult.getResult();
 *  // ==> { * Resultado do pedido * }
 * ```
 */
class solicitarAlteracaoRecebimentoMTR extends ApiRequest {
    private token: MtrWSType.auth.token;
    private dados_solicitacao_alteracao:
        MtrWSType.requestModel.solicitarAlteracaoRecebimentoMTR;

    constructor({
        dadosSolicitacaoAlteracaoMTR,
        authToken,
        API_BASE_URL,
    }: solicitarAlteracaoRecebimentoMTRConfig) {
        super(API_BASE_URL, MtrWSRoute.ACEITAR_ALTERACAO_RECEBIMENTO_MTR);
        this.token = authToken;
        this.dados_solicitacao_alteracao = dadosSolicitacaoAlteracaoMTR;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult(): Promise<
        MtrWSType.responseModel.solicitarAlteracaoRecebimentoMTR
    > {
        const req = await this.makeRequest<
            MtrWSType.requestModel.solicitarAlteracaoRecebimentoMTR,
            MtrWSType.responseModel.solicitarAlteracaoRecebimentoMTR
        >({
            method: "POST",
            body: this.dados_solicitacao_alteracao,
            auth: this.token,
        });

        return req;
    }
}
