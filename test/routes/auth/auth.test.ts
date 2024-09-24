/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    MtrWSBaseURL,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { afterAll, beforeAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

import { gerarAuthToken } from "~route/auth/auth.ts";

/*
    Testes para validação da API de autenticação / geração de token de acesso
*/

describe("AUTH - Tests", () => {
    let _CREDENTIALS: MtrWSType.auth.credentials;
    let _BASE_URL: MtrWSBaseURL;

    beforeAll(() => {
        const _env = Deno.env.toObject();
        const _base = (_env.TEST_BASE_API ?? "SINIR") as "SINIR" | "SIGOR";

        _CREDENTIALS = {
            cpfCnpj: _env.TEST_AUTH_CPF ?? "",
            senha: _env.TEST_AUTH_PASSWORD ?? "",
            unidade: _env.TEST_AUTH_UNIDADE ?? "",
        };
        _BASE_URL = MtrWSBaseURL[_base];
    });

    afterAll(() => {
        _CREDENTIALS = { cpfCnpj: "", senha: "", unidade: "" };
    });

    describe("Expected scenario", () => {
        it("Simple generate token", async () => {
            const consult = new gerarAuthToken({
                credentials: _CREDENTIALS,
                API_BASE_URL: _BASE_URL,
            });
            const result = await consult.getResult();

            expect(result).toContain("Bearer");
        });
    });

    describe("Invalid credentials", () => {
        it("Invalid CPF", async () => {
            const { senha, unidade } = _CREDENTIALS;
            const cred = { cpfCnpj: "1234567890", senha, unidade };

            const consult = new gerarAuthToken({
                credentials: cred,
                API_BASE_URL: _BASE_URL,
            });
            const result = consult.getResult();

            const regex = new RegExp(/\bERRO 005\b/);
            await expect(result).rejects.toThrow(regex);
        });

        it("Invalid Password", async () => {
            const { cpfCnpj, unidade } = _CREDENTIALS;
            const cred = { cpfCnpj, senha: "abcd123456", unidade };

            const consult = new gerarAuthToken({
                credentials: cred,
                API_BASE_URL: _BASE_URL,
            });
            const result = consult.getResult();

            const regex = new RegExp(/\bERRO 007\b/);
            await expect(result).rejects.toThrow(regex);
        });

        it("Invalid Unity", async () => {
            const { cpfCnpj, senha } = _CREDENTIALS;
            const cred = { cpfCnpj, senha, unidade: "111111" };

            const consult = new gerarAuthToken({
                credentials: cred,
                API_BASE_URL: _BASE_URL,
            });
            const result = consult.getResult();

            const regex = new RegExp(/\bERRO 007\b/);
            await expect(result).rejects.toThrow(regex);
        });
    });
});
