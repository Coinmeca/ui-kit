"use client";
import { Layouts } from "components";
import Notify from "../notification/Notify";
import Style from "./Toast.styled";
import { type Notify as Content } from "hooks/useNotification";
import { useEffect } from "react";

export default function Toast({ list, width }: { list?: Content[]; width?: number }) {
    width = width || 60;

    useEffect(() => {
        console.log("side toast change");
    }, [list]);

    return (
        typeof list !== "undefined" &&
        list.length > 0 && (
            <Style>
                <Layouts.Contents.InnerContent>
                    {list && list?.length > 0 && list?.map((v: any, k: number) => <Notify key={k} {...v} />)}
                </Layouts.Contents.InnerContent>
            </Style>
        )
    );
}
