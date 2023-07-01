import Style from "./InnerContent.styled";

export default function InnerContent({ children }: { children: any }) {
    return <Style>{children}</Style>;
}
