import { auth } from "./auth.controller.ts";
import { consult } from "./consult.controller.ts";
import { create } from "./create.controller.ts";
import { remove } from "./delete.controller.ts";
import { download } from "./download.controller.ts";
import { receive } from "./receive.controller.ts";

export const MtrWS = {
    auth,
    create,
    consult,
    remove,
    download,
    receive,
};
