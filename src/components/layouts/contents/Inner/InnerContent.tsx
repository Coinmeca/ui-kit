import { ReactNode } from "react";
import Style from "./InnerContent.styled";

export default function InnerContent({ children }: { children: ReactNode }) {
    return <Style>{children}</Style>;
}
