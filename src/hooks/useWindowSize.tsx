import { useContext } from "react";
import { WindowSizeContext } from "contexts/WindowSize";

export default function useTheme() {
    return useContext(WindowSizeContext);
}
