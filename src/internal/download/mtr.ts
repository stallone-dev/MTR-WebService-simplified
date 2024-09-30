/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "~model/api-request.ts";

export { downloadMTR };

/** Interface para implementação */
interface downloadMTRConfig {
    mtrID: string;
    authToken: MtrWSType.auth.token;
    API_BASE_URL: MtrWSBaseURL;
}

/**
 * Módulo de download de MTR
 *
 * @example Implementando a função
 * ```ts
 *  import { downloadMTR } from "..."
 *  import { MtrWSBaseURL } from "..."
 *
 *  const token = "Bearer _TOKEN_"
 *  const base_url = MtrWSBaseURL.SINIR;
 *  const mtr_id = "251001001010"
 *
 *  // Preparando a API
 *  const consult = new downloadMTR({
 *      mtrID: mtr_id,
 *      authToken: token,
 *      API_BASE_URL: base_url
 *  });
 *
 *  // Capturando o resultado
 *  const result = await consult.getResult();
 *  // ==> { * ReadableStream * }
 * ```
 *
 * @example Transformadno o stream em um arquivo.pdf (DenoJS)
 * ```ts
 * import { copy, readerFromStreamReader } from "@std/io";
 * import { downloadMTR } from "..."
 *
 * // Capturando o resultado da API
 * const result = await new downloadMTR(...).getResult()
 *
 * // Criando Preparando um espaço de arquivo
 * const FILE_PATH = ".temp_file.pdf";
 * const file = await Deno.open(FILE_PATH, { create: true, write: true, read: true }
 *
 * // Convertendo o Stream da API em algo utilizáleo pelo DenoJS
 * const reader = readerFromStreamReader(result.getReader())
 *
 * // Transferindo os dados do Stream para o arquivo
 * await copy(reader, file);
 *
 * // Fechando os dados do arquivo
 * file.close()
 * ```
 */
class downloadMTR extends ApiRequest {
    private readonly token: MtrWSType.auth.token;
    private readonly mtr_id: string;

    constructor({ mtrID, authToken, API_BASE_URL }: downloadMTRConfig) {
        super(API_BASE_URL, MtrWSRoute.DOWNLOAD_MTR);
        this.token = authToken;
        this.mtr_id = mtrID;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult(): Promise<MtrWSType.responseModel.downloadMTR> {
        const req = await this.makeRequest<
            MtrWSType.requestModel.downloadMTR,
            MtrWSType.responseModel.downloadMTR
        >({
            method: "POST",
            pathString: String(this.mtr_id),
            auth: this.token,
        });

        return req;
    }
}
