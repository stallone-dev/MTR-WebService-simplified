import { _auth } from "./internal/auth.controller.ts";
import { _consult } from "./internal/consult.controller.ts";
import { _create } from "./internal/create.controller.ts";
import { _remove } from "./internal/remove.controller.ts";
import { _download } from "./internal/download.controller.ts";
import { _receive } from "./internal/receive.controller.ts";

export const MtrWSInternal = {
    _auth,
    _create,
    _consult,
    _remove,
    _download,
    _receive,
};
