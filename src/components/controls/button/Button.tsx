import { Icon } from "components/controls";

interface Props {
    children?: any;
    type?: "glass" | "line" | "solid";
    color?: string;
    icon?: string;
    iconLeft?: string;
    iconRight?: string;
    onClick?: Function;
}

export default function Button(props: Props) {
    const type = props.type || "solid";
    const color = props.color || "black";

    const icon = (icon: string) => {
        return <Icon icon={icon} color={`${type === "solid" ? "white" : color}`} />;
    };

    const click = (e?: any) => {
        alert("1");
        if (typeof props.onClick === "function") props.onClick(e);
    };

    return (
        <button style={{ display: "flex", alignItems: "center", gap: "1em", padding: "1em", userSelect: "none" }} onClick={(e) => click(e)}>
            {props.icon && typeof props.children === "undefined" ? (
                icon(props.icon)
            ) : (
                <>
                    {props.iconLeft && icon(props.iconLeft)}
                    <span>{props.children}</span>
                    {props.iconRight && icon(props.iconRight)}
                </>
            )}
        </button>
    );
}
