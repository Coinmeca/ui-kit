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

    const Items = ({menu, key}:{menu:any, key?:number}) => {
        return (
            (typeof menu?.menu !== "string" && menu?.menu?.length) > 0 ? (
                <Row $scale={scale} $fix={menu?.fix}>
                    {menu?.menu?.map((item: any, i: number) => (
                        <Items key={i} menu={item} />
                    ))}
                </Row>
            ) : (
                (typeof menu !== "string" && menu?.length) > 0 ? (
                    <Row $scale={scale} $fix={menu?.fix}>
                        {menu?.map((item: any, i: number) => (
                            <Items key={i} menu={item} />
                        ))}
                    </Row>
                ) : (
                    menu
                )
            )
        );
    };

    const Menus = ({ menu, key }: { menu: any; key?: number }) => {
        return (
            <>
                {key !== 0 && <Layouts.Divider />}
                <Items menu={menu} />
            </>
        );
    };

    return <Style $scale={scale}>{typeof props?.menu !== "string" && props?.menu?.length > 0 ? props?.menu?.map((menu: any, i: number) => <Menus key={i} menu={menu} />) : <Row $scale={scale}>{props?.menu}</Row>}</Style>;
}
