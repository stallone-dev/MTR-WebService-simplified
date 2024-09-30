/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "~model/api-request.ts";

export { downloadCDF };

/** Interface para implementação da API */
interface downloadCDFConfig {
    cdfID: number;
    authToken: MtrWSType.auth.token;
    API_BASE_URL: MtrWSBaseURL;
}

/**
 * Módulo de download de CDF
 *
 * @example Implementando a função
 * ```ts
 *  import { downloadCDF } from "..."
 *  import { MtrWSBaseURL } from "..."
 *
 *  const token = "Bearer _TOKEN_"
 *  const base_url = MtrWSBaseURL.SINIR;
 *  const cdf_id = "123456"
 *
 *  // Preparando a API
 *  const consult = new downloadCDF({
 *      mtrID: cdf_id,
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
 * import { downloadCDF } from "..."
 *
 * // Capturando o resultado da API
 * const result = await new downloadCDF(...).getResult()
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
class downloadCDF extends ApiRequest {
    private token: MtrWSType.auth.token;
    private cdf_id: number;

    constructor({ cdfID, authToken, API_BASE_URL }: downloadCDFConfig) {
        super(API_BASE_URL, MtrWSRoute.DOWNLOAD_CDF);
        this.token = authToken;
        this.cdf_id = cdfID;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult(): Promise<MtrWSType.responseModel.downloadCDF> {
        const req = await this.makeRequest<
            MtrWSType.requestModel.downloadCDF,
            MtrWSType.responseModel.downloadCDF
        >({
            method: "POST",
            pathString: String(this.cdf_id),
            auth: this.token,
        });

        return req;
    }
}
