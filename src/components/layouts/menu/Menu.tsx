"use client";

import { Layouts } from "components";
import { Fragment } from "react";
import Style, { Row } from "./Menu.styled";

export interface Menu {
    menu?: any;
    style?: object;
    scale?: number;
    show?: "desktop" | "laptop" | "tablet" | "mobile";
    hide?: "desktop" | "laptop" | "tablet" | "mobile";
}

export interface MenuItem {
    align?: "left" | "center" | "right";
    menu?: any;
    direction: "row" | "col";
    show?: "desktop" | "laptop" | "tablet" | "mobile";
    hide?: "desktop" | "laptop" | "tablet" | "mobile";
}

export default function Menu(props: Menu) {
    const scale = props?.scale || 1;

    const Items = (menu: (Menu[] | string[] | number[] | string | number) | any) => {
        return typeof menu === "object" && menu?.children?.length > 0 ? (
            <Row $scale={scale} style={menu?.style} $fix={menu?.fix} data-show={menu?.show} data-hide={menu?.hide}>
                {menu?.children &&
                    (Array.isArray(menu?.children)
                        ? menu?.children?.map((v: any, k: number) => (
                              <Fragment key={k}>{Items(v?.children || (!v?.style && v))}</Fragment>
                          ))
                        : Items(menu?.children))}
            </Row>
        ) : Array.isArray(menu) && menu?.length > 0 ? (
            <Row $scale={scale}>
                {menu?.map((v: any, k: number) => (
                    <Fragment key={k}>{Items(v)}</Fragment>
                ))}
            </Row>
        ) : (
            <>{menu}</>
        );
    };

    const Menus = (menu: any) => {
        return (
            <>
                <Row $scale={scale} style={menu?.style} data-show={menu?.show} data-hide={menu?.hide}>
                    {Items(menu?.children || (!menu?.style && menu))}
                </Row>
                <Layouts.Divider />
            </>
        );
    };

    return (
        props?.menu && (
            <Style style={props?.style} $scale={scale} data-show={props?.show} data-hide={props?.hide}>
                {typeof props?.menu !== "string" && props?.menu?.length > 0 ? (
                    props?.menu?.map((v: any, k: number) => <Fragment key={k}>{Menus(v)}</Fragment>)
                ) : (
                    <>
                        {Items(props?.menu)}
                        <Layouts.Divider />
                    </>
                )}
            </Style>
        )
    );
}
