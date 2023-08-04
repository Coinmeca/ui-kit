import { Layouts } from "components";
import SamplesLayout from "./samples/layout";

export default function NotFound() {
    return (
        <SamplesLayout>
            <Layouts.Panel>
                <Layouts.Box>Not found?</Layouts.Box>
            </Layouts.Panel>
        </SamplesLayout>
    );
}
