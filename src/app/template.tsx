import { Notification, Theme } from "contexts";
import { Style } from "lib";

export default function Template({ children }: { children: any }) {
    return (
        <Style.Initialize>
            <Theme>
                <Notification>{children}</Notification>
            </Theme>
        </Style.Initialize>
    );
}
