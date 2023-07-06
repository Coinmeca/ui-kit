import { Layouts } from "components";
import Style, { Row } from "./Menu.styled";
import { Fragment } from "react";

export interface Menu {
    menu?: any;
    scale?: number;
}

export interface MenuItem {
    align?: "left" | "center" | "right";
    menu?: any;
    device?: "desktop" | "laptop" | "tablet" | "mobile";
    direction: "row" | "col";
}

export default function Menu(props: Menu) {
    const scale = props?.scale || 1;

    const Items = (menu: any) => {
        return (
            typeof menu !== "string" && menu?.length) > 0 ? (
            <Row $scale={scale} style={menu?.style} $fix={menu?.fix}>
                {menu?.map((v: any, k: number) =>
                    <Fragment key={k}>
                        {Items(v?.children || !v?.style && v)}
                    </Fragment>
                )}
            </Row>
        ) : (
            <>
                {menu}
            </>
        );
    };

    const Menus = (menu: any, i: number) => {
        return (
            <>
                {i !== 0 && <Layouts.Divider />}
                <Row $scale={scale} style={menu?.style}>{Items(menu?.children || !menu?.style && menu)}</Row>
            </>
        );
    };

    return (props?.menu && (
        <Style $scale={scale}>
            {typeof props?.menu !== "string" && props?.menu?.length > 0 ?
                (
                    props?.menu?.map((v: any, k: number) =>
                        <Fragment key={k}>
                            {Menus((v?.children || v), i)}
                        </Fragment>
                    )
                ) : (
                    <Row $scale={scale} style={props?.menu?.style}>{props?.menu?.children || props?.menu}</Row>
                )
            }
        </Style>
    )
    );
}
