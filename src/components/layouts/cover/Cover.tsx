import type { BG } from "components/layouts/bg/BG";

export interface Cover {
    children?: any;
    background?: BG;
    fullsize?: boolean;
}

export default function Cover(props: Cover) {
    return <>{props?.children}</>;
}
