/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    MtrWSBaseURL,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { generateTemporaryToken } from "../../token-generator-for-tests.ts";
import { afterAll, beforeAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import { solicitarAlteracaoRecebimentoMTR } from "~internal/create/alteracao-mtr.ts";

/*
    Testes para validação da API de pedido de alteração de MTRs
*/

describe("ALTERAR-MTR - Tests", () => {
    /** Risco real de modificação */
    const _ignore = Deno.env.get("TEST_ENABLE_DANGEROUS_TESTS") === "FALSE";

    const _MTR_TO_ALTER = "1234567890";
    let _TOKEN: MtrWSType.auth.token;
    let _BASE_URL: MtrWSBaseURL;
    let _MTR_DATA: MtrWSType.requestModel.solicitarAlteracaoRecebimentoMTR;

    beforeAll(async () => {
        const _env = Deno.env.toObject();
        const _base = (_env.TEST_BASE_API ?? "SINIR") as "SINIR" | "SIGOR";

        _BASE_URL = MtrWSBaseURL[_base];
        _TOKEN = await generateTemporaryToken(_BASE_URL);
        _MTR_DATA = {
            parCodigoDestinador: _env.TEST_AUTH_UNIDADE,
            remObservacao: "Teste de alteração de MTR",
            manifesto: {
                manNumero: _MTR_TO_ALTER,
                listaManifestoResiduo: [
                    {
                        claCodigo: 12,
                        claCodigoNovo: 13,
                        marQuantidade: 0.006,
                        marQuantidadeRecebida: 6.0,
                        resCodigoIbama: "170107",
                        traCodigo: 1,
                        traCodigoNovo: 2,
                    },
                ],
            },
        };
    });

    afterAll(() => {
        _TOKEN = "Bearer _";
    });

    describe("Expected scenario", { ignore: _ignore }, () => {
        it("Simple get result", async () => {
            const consult = new solicitarAlteracaoRecebimentoMTR({
                authToken: _TOKEN,
                API_BASE_URL: _BASE_URL,
                dadosSolicitacaoAlteracaoMTR: _MTR_DATA,
            });

            const result = await consult.getResult();

            expect(result).not.toThrow();
        });
    });

    describe("Invalid scenarios", () => {
        it("Token", async () => {
            const token = "Bearer _";
            const consult = new solicitarAlteracaoRecebimentoMTR({
                authToken: token,
                dadosSolicitacaoAlteracaoMTR: _MTR_DATA,
                API_BASE_URL: _BASE_URL,
            });
            const result = consult.getResult();

            await expect(result).rejects.toThrow();
        });

        it("CDF ID", async () => {
            const mtr_data = {};
            const consult = new solicitarAlteracaoRecebimentoMTR({
                authToken: _TOKEN,
                dadosSolicitacaoAlteracaoMTR: mtr_data,
                API_BASE_URL: _BASE_URL,
            });
            const result = consult.getResult();

            await expect(result).rejects.toThrow();
        });

        it("Base URL", async () => {
            const base_url = Deno.env.get("TEST_BASE_API") === "SINIR"
                ? MtrWSBaseURL.SIGOR
                : MtrWSBaseURL.SINIR;

            const consult = new solicitarAlteracaoRecebimentoMTR({
                authToken: _TOKEN,
                dadosSolicitacaoAlteracaoMTR: _MTR_DATA,
                API_BASE_URL: base_url,
            });
            const result = consult.getResult();

            const regex = new RegExp(/Unexpected end of JSON input/);
            await expect(result).rejects.toThrow(regex);
        });
    });
});
