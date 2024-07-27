import { Notification, Theme, WindowSize } from "contexts";
import { Style } from "lib";

export default function Template({ children }: { children: any }) {
    return (
        <Style.Initialize>
            <WindowSize>
                <Theme>
                    <Notification>{children}</Notification>
                </Theme>
            </WindowSize>
        </Style.Initialize>
    );
}
