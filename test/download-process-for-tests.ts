/*
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
import { copy, readerFromStreamReader } from "@std/io";

export { takeTemporaryDownloadPDF };

interface downloadDPFResult {
    info: string;
    path: string;
    error: boolean;
}

/**
 * Function to make temporary file
 */
async function takeTemporaryDownloadPDF(
    readStream: ReadableStreamDefaultReader<Uint8Array>,
): Promise<downloadDPFResult> {
    const TEMP_FILE = "./temp_file.pdf";
    let result: downloadDPFResult;

    // Processo de criação e escrita no arquivo (específico do DenoJS)
    const file = await Deno.open(TEMP_FILE, {
        create: true,
        write: true,
        read: true,
    });

    try {
        // Transformação do buffer em um formato trabalhável no Deno
        const reader = readerFromStreamReader(readStream);

        // Sobrescrevendo o arquivo com os novos dados
        await copy(reader, file);

        result = { info: "Success!", path: TEMP_FILE, error: false };
    } catch {
        result = { info: "File isn't generated.", path: "", error: true };
    }

    // Fechamento do arquivo
    file.close();

    Deno.remove(TEMP_FILE);

    return result;
}
