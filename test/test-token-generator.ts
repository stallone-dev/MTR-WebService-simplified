/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import { MtrWSBaseURL, MtrWSType } from "@stallone-dev/types-mtr-web-service";
import { gerarAuthToken } from "../src/routes/auth/auth.ts";

export { generateTemporaryToken };

console.log(await generateTemporaryToken(MtrWSBaseURL.SINIR));

/**
 * Função para gerar um token de acesso ao sistema
 * @default BASE_API_URL = SINIR
 */
async function generateTemporaryToken(
    BASE_API_URL: MtrWSBaseURL = MtrWSBaseURL.SINIR,
): Promise<MtrWSType.auth.token> {
    const AUTH_TEMP_FILE = "./auth_file";

    let TOKEN = "";

    try {
        // Leitura e captura raṕida do conteúdo em texto do arquivo;
        TOKEN = await Deno.readTextFile(AUTH_TEMP_FILE);
    } catch {
        // Preparo para criação de um novo token
        const credentials: MtrWSType.auth.credentials = {
            cpfCnpj: "1234"!,
            senha: Deno.env.get("TEST_AUTH_PASSWORD")!,
            unidade: Deno.env.get("TEST_AUTH_UNIDADE")!,
        };

        // Geraçaõ do token
        TOKEN = await new gerarAuthToken(
            credentials,
            BASE_API_URL,
        ).getResult();

        // Processo de criação e escrita no arquivo (específico do DENO.JS)
        const file = await Deno.create(AUTH_TEMP_FILE);
        const writer = file.writable.getWriter();
        await writer.write(new TextEncoder().encode(TOKEN));
        await writer.close();
    }

    return TOKEN as MtrWSType.auth.token;
}
