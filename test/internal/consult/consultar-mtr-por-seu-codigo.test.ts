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

import { consultarMTRPorSeuCodigo } from "~internal/consult/consultar-mtr-por-seu-codigo.ts";

/*
    Testes para validação da API de consulta de MTR por "SeuCodigo"
*/

describe("CONSULT-MTR-POR-SEU-CODIGO - Tests", () => {
    /** API ainda não implantada no sistema SINIR */
    const _ignore = Deno.env.get("TEST_BASE_API") === "SINIR";

    let _base: "SINIR" | "SIGOR";
    let _TOKEN: MtrWSType.auth.token;
    let _BASE_URL: MtrWSBaseURL;
    let _SEUCODIGO: MtrWSType.requestModel.retornaMTRsPorSeuCodigo;

    beforeAll(async () => {
        const _env = Deno.env.toObject();
        _base = (_env.TEST_BASE_API ?? "SINIR") as "SINIR" | "SIGOR";
        _BASE_URL = MtrWSBaseURL[_base];
        _TOKEN = await generateTemporaryToken(_BASE_URL);
        _SEUCODIGO = {
            seuCodigo: _env.TEST_CONSULT_SEUCODIGO,
            suaUnidade: _env.TEST_CONSULT_SUAUNIDADE,
        };
    });

    afterAll(() => {
        _TOKEN = "Bearer _";
    });

    describe("Expected scenario", { ignore: _ignore }, () => {
        it("Simple consult MTR", async () => {
            const consult = new consultarMTRPorSeuCodigo({
                seuCodigo: _SEUCODIGO,
                authToken: _TOKEN,
                API_BASE_URL: _BASE_URL,
            });
            const result = await consult.getResult();

            expect(result).toContain("manNumero");
        });
    });

    describe("Invalid scenarios", { ignore: _ignore }, () => {
        it("Token", async () => {
            const token = "Bearer _";
            const consult = new consultarMTRPorSeuCodigo({
                seuCodigo: _SEUCODIGO,
                authToken: token,
                API_BASE_URL: _BASE_URL,
            });
            const result = consult.getResult();

            await expect(result).rejects.toThrow();
        });

        it("SeuCodigo", async () => {
            const consult = new consultarMTRPorSeuCodigo({
                seuCodigo: {
                    seuCodigo: "11",
                    suaUnidade: Deno.env.get("TEST_CONSULT_SUAUNIDADE") ?? "",
                },
                authToken: _TOKEN,
                API_BASE_URL: _BASE_URL,
            });
            const result = consult.getResult();

            const regex = new RegExp(/Manifesto não encontrado!/);
            await expect(result).rejects.toThrow(regex);
        });

        it("SuaUnidade", async () => {
            const consult = new consultarMTRPorSeuCodigo({
                seuCodigo: {
                    seuCodigo: Deno.env.get("TEST_CONSULT_SEUCODIGO") ?? "",
                    suaUnidade: "00",
                },
                authToken: _TOKEN,
                API_BASE_URL: _BASE_URL,
            });
            const result = consult.getResult();

            const regex = new RegExp(/Manifesto não encontrado!/);
            await expect(result).rejects.toThrow(regex);
        });

        it("Base URL", async () => {
            const base_url = Deno.env.get("TEST_BASE_API") === "SINIR"
                ? MtrWSBaseURL.SIGOR
                : MtrWSBaseURL.SINIR;

            const consult = new consultarMTRPorSeuCodigo({
                seuCodigo: _SEUCODIGO,
                authToken: _TOKEN,
                API_BASE_URL: base_url,
            });
            const result = consult.getResult();

            const regex = new RegExp(/Unexpected end of JSON input/);
            await expect(result).rejects.toThrow(regex);
        });
    });
});
