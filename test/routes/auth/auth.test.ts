/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import {
    MtrWSBaseURL,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { gerarAuthToken } from "../../../src/routes/auth/auth.ts";

describe("AUTH - Tests", () => {
    let credentials: MtrWSType.auth.credentials = {
        cpfCnpj: Deno.env.get("TEST_AUTH_CPF")!,
        senha: Deno.env.get("TEST_AUTH_PASSWORD")!,
        unidade: Deno.env.get("TEST_AUTH_UNIDADE")!,
    };

    it("Simple generate token", () => {
        const result = `Bearer a`;
        expect(result).toContain("Bearer");
    });

    describe("Invalid credentials", () => {
        it("Invalid CPF", async () => {
            const { senha, unidade } = credentials;
            const cred = { cpfCnpj: "1234567890", senha, unidade };
            const consult = await new gerarAuthToken(
                credentials,
                MtrWSBaseURL.SINIR,
            ).getResult();
            // Falta implementar o EXPECT
        });
        it("Invalid Password", async () => {});
        it("Invalid Unity", async () => {});
    });

    it("", () => {});

    it("", () => {});
});
