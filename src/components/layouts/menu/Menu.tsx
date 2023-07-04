import { Layouts } from "components";
import Style, { Row } from "./Menu.styled";

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
            (typeof props?.menu !== "string" && props?.menu?.length) > 0 ? (
                <Row $scale={scale} style={props?.style} $fix={props?.fix}>
                    {console.log(props?.menu)}
                    {props?.menu?.map((item: any, i: any) => item?.children ? <Items key={i} menu={item?.children} /> : <Items key={i} menu={item} />)}
                </Row>
            ) : (
                props?.menu
            )
        );
    };

    const Menus = (props:any) => {
        return (
            <>
                {props?.menu && (
                    <>
                        {props?.key !== 0 && <Layouts.Divider />}
                        <Items menu={props?.menu} />
                    </>
                )}
            </>
        );
    };

    return (props?.menu && (
            <Style $scale={scale}>
                {typeof props?.menu !== "string" && props?.menu?.length > 0 ? 
                    (
                        props?.menu?.map((menu: any, i: number) => menu?.children ? <Menus key={i} index={i} menu={menu?.children} /> : <Menus key={i} index={i} menu={menu} />)
                    ) : (
                        <Row $scale={scale}>{props?.menu}</Row>
                        )
                    }
            </Style>
        )
    );
}
