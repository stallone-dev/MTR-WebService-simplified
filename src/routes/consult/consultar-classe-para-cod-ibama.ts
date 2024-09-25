/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import {
    type MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { consultarClasseParaCodIBAMA };

class consultarClasseParaCodIBAMA extends ApiRequest {
    private token: MtrWSType.auth.token;
    private residuo_ID: string;

    constructor(
        codigoResiduo: string,
        authToken: MtrWSType.auth.token,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.CONSULTAR_CLASSES_PARA_COD_IBAMA);
        this.token = authToken;
        this.residuo_ID = codigoResiduo;
    }

    /**
     * Consultar dados de um MTR
     */
    public async getResult(): Promise<
        MtrWSType.responseModel.consultarClassesParaCodIBAMA
    > {
        const req = await this.makeRequest<
            MtrWSType.requestModel.consultarClassesParaCodIBAMA,
            MtrWSType.responseModel.consultarClassesParaCodIBAMA
        >({
            method: "POST",
            pathString: this.residuo_ID,
            auth: this.token,
        });

        return req;
    }
}
