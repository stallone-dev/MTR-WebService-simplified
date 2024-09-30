import { auth } from "~internal/auth.index.ts";
import { consult } from "~internal/consult.index.ts";
import { create } from "~internal/create.index.ts";
import { remove } from "~internal/remove.index.ts";
import { download } from "~internal/download.index.ts";
import { receive } from "~internal/receive.index.ts";

export const MtrWSInternals = {
    auth,
    create,
    consult,
    remove,
    download,
    receive,
};
