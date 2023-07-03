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

    const Items = (props:any) => {
        return (
            <>
                {(typeof props?.menu?.menu !== "string" && props?.menu?.menu?.length) > 0 ? (
                    <Row $scale={scale} $fix={props?.menu?.fix}>
                        {props?.menu?.menu?.map((item: any, i: number) => (
                            <Items key={i} menu={item} />
                        ))}
                    </Row>
                ) : (
                    (typeof props?.menu !== "string" && props?.menu?.length) > 0 ? (
                        <Row $scale={scale} $fix={props?.menu?.fix}>
                            {props?.menu?.map((item: any, i: number) => (
                                <Items key={i} menu={item} />
                            ))}
                        </Row>
                    ) : (
                        props?.menu
                    )
                )}
            </>
        );
    };

    const Menus = (props:any) => {
        return (
            <>
                {props?.key !== 0 && <Layouts.Divider />}
                <Items menu={props?.menu} />
            </>
        );
    };

    return <Style $scale={scale}>{typeof props?.menu !== "string" && props?.menu?.length > 0 ? props?.menu?.map((menu: any, i: number) => <Menus key={i} menu={menu} />) : <Row $scale={scale}>{props?.menu}</Row>}</Style>;
}
