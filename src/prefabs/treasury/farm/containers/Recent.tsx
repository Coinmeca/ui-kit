"use client";

import { Layouts } from "components";
import type { List } from "components/layouts/list/List";

export interface Recent extends List { }

export default function Recent(props: Recent) {
    return <Layouts.List {...props} style={{ height: "100%" }} />;
}
