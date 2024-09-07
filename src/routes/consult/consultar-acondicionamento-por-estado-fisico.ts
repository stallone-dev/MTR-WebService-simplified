import {
    MtrWSBaseURL,
    MtrWSRoute,
    type MtrWSType,
} from "@stallone-dev/types-mtr-web-service";
import { ApiRequest } from "../../model/api-request.ts";

export { consultarAcondicionamentoPorEstadoFisico };

/**
 * Consulta dos tipos de acondicionamento disponíveis para um determinado código de estado físico
 */
class consultarAcondicionamentoPorEstadoFisico extends ApiRequest {
    private token: MtrWSType.auth.token;
    private estado_fisico_ID: number;

    constructor(
        codEstadoFisico: number,
        authToken: MtrWSType.auth.token,
        API_BASE_URL: MtrWSBaseURL,
    ) {
        super(API_BASE_URL, MtrWSRoute.CONSULTAR_MTR);
        this.token = authToken;
        this.estado_fisico_ID = codEstadoFisico;
    }

    /**
     * Resultado da consulta de acondicionamentos disponíveis para um determinado estado físico
     */
    public async getResult() {
        const req = await this.makeRequest<
            MtrWSType.requestBody.consultarAcondicionamentoPorEstadoFisico,
            MtrWSType.responseBody.consultarAcondicionamentoPorEstadoFisico
        >({
            method: "POST",
            pathString: String(this.estado_fisico_ID),
            auth: this.token,
        });

        return req;
    }
}
