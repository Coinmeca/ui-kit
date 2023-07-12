import { Layouts } from "components";
import { Text } from "components/elements";

export default function Main() {
    return (
        <Layouts.Content>
            <Layouts.Cover>
                <Layouts.BG filter={"black"} />
            </Layouts.Cover>
            <Layouts.Box>
                <Text type="h4">Hi, Coinmeca UI.</Text>
            </Layouts.Box>
        </Layouts.Content>
    );
}
