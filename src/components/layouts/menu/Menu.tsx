import { Layouts } from "components";
import Style, { Item } from "./Menu.styled";

export interface Menu {
    children?: any;
}

export interface MenuItem {
    align?: "left" | "center" | "right";
    children?: any;
    device?: "desktop" | "laptop" | "tablet" | "mobile";
    direction: "row" | "col";
}

export default function Menu(props: Menu) {
    const Item = (item: any) => {
        return item?.children ? (
            item?.children?.length > 0 ? (
                item?.children?.map((menu: any, i: number) => (
                    <>
                        <Item key={i} data-direction={item?.direction} data-device={menu?.device} data-align={menu?.align} data-fit={menu?.fit}>
                            {menu}
                        </Item>
                    </>
                ))
            ) : (
                <Item data-direction={item?.direction} data-device={item?.device} data-align={item?.align}>
                    {item?.children}
                </Item>
            )
        ) : (
            <Item>{item}</Item>
        );
    };

    return (
        <Style>
            {props?.children?.length > 0 ? (
                props?.children?.map((menu: any, i: number) => (
                    <>
                        {i !== 0 && <Layouts.Divider />}
                        <Item key={i} data-direction={menu?.direction} data-device={menu?.device} data-align={menu?.align} data-fit={menu?.fit}>
                            {Item(menu)}
                        </Item>
                    </>
                ))
            ) : (
                <Item>{props?.children}</Item>
            )}
        </Style>
    );
}
