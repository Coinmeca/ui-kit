import { Layouts } from "components";
import Style, { Row } from "./Menu.styled";
import { Fragment } from "react";

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

    const Items = (menu: any) => {
        return (typeof menu !== "string" && menu?.length) > 0 ? (
            <Row $scale={scale} style={menu?.style} $fix={menu?.fix} data-show={menu?.show} data-hide={menu?.hide}>
                {menu?.map((v: any, k: number) => (
                    <Fragment key={k}>{Items(v?.children || (!v?.style && v))}</Fragment>
                ))}
            </Row>
        ) : (
            <>{menu}</>
        );
    };

    const Menus = (menu: any, i: number, l: number) => {
        return (
            <>
                <Row $scale={scale} style={menu?.style} data-show={menu?.show} data-hide={menu?.hide}>
                    {Items(menu?.children || (!menu?.style && menu))}
                </Row>
                {i !== l && <Layouts.Divider />}
            </>
        );
    };

    return (
        props?.menu && (
            <Style style={props?.style} $scale={scale} data-show={props?.show} data-hide={props?.hide}>
                {typeof props?.menu !== "string" && props?.menu?.length > 0 ? (
                    props?.menu?.map((v: any, k: number) => <Fragment key={k}>{Menus(v?.children || v, k, props?.menu?.length)}</Fragment>)
                ) : (
                    <Row $scale={scale} style={props?.menu?.style}>
                        {props?.menu?.children || props?.menu}
                    </Row>
                )}
            </Style>
        )
    );
}
