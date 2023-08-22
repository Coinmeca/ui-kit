"use client";
import { Layouts } from "components";
import Notify from "./Notify";
import type { Notify as Content } from "hooks/useToast";
import Style from "./Notification.styled";

export default function Notification({ list }: { list: Content[] }) {
    return (
        <Style>
            <Layouts.Contents.InnerContent>
                {list &&
                    list?.length > 0 &&
                    list?.map((v: any, k: number) => <Notify key={k} {...v} />)}
            </Layouts.Contents.InnerContent>
        </Style>
    );
}
