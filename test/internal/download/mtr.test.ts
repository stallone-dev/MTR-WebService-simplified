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

import { downloadCDF } from "../../../src/internal/download/cdf.ts";

/*
    Testes para validação da API de download de CDF
*/

describe("LISTAR-ACONDICIONAMENTOS - Tests", () => {
    let _TOKEN: MtrWSType.auth.token;
    let _BASE_URL: MtrWSBaseURL;

    beforeAll(async () => {
        const _env = Deno.env.toObject();
        const _base = (_env.TEST_BASE_API ?? "SINIR") as "SINIR" | "SIGOR";

        _BASE_URL = MtrWSBaseURL[_base];
        _TOKEN = await generateTemporaryToken(_BASE_URL);
    });

    afterAll(() => {
        _TOKEN = "Bearer _";
    });

    describe("Expected scenario", () => {
        it("Simple get result", async () => {
            const consult = new listarAcondicionamentos({
                authToken: _TOKEN,
                API_BASE_URL: _BASE_URL,
            });
            const result = await consult.getResult();

            expect(result[1]).toMatchObject({
                "tiaCodigo": 4,
                "tiaDescricao": "CAÇAMBA ABERTA",
            });
        });
    });

    describe("Invalid scenarios", () => {
        it("Token", async () => {
            const token = "Bearer _";
            const consult = new listarAcondicionamentos({
                authToken: token,
                API_BASE_URL: _BASE_URL,
            });
            const result = consult.getResult();

            await expect(result).rejects.toThrow();
        });

        it("Base URL", async () => {
            const base_url = Deno.env.get("TEST_BASE_API") === "SINIR"
                ? MtrWSBaseURL.SIGOR
                : MtrWSBaseURL.SINIR;

            const consult = new listarAcondicionamentos({
                authToken: _TOKEN,
                API_BASE_URL: base_url,
            });
            const result = consult.getResult();

            const regex = new RegExp(/Unexpected end of JSON input/);
            await expect(result).rejects.toThrow(regex);
        });
    });
});
