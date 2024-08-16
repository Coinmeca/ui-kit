"use client";

import { Layouts } from "components";
import type { List } from "components/layouts/list/List";
import type { VaultRecent } from "types";

export interface Recent extends Omit<List, "list"> {
    list?: VaultRecent[]
}

export default function Recent(props: Recent) {
    return <Layouts.List {...props} style={{ height: "100%" }} />;
}
