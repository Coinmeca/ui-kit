import Style from "./Divider.styled";

interface Divider {
    vertical?: boolean;
    margin?: number;
    style?: any;
}

export default function Divider(props: Divider) {
    const vertical = props?.vertical || false;
    const margin = props?.margin || 0;

    return <Style $vertical={vertical} $margin={margin} style={props?.style} />;
}
