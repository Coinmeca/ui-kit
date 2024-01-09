import { useContext } from "react";
import { ScrollPositionContext } from "contexts/ScrollPosition";

export default function useScrollPosition() {
    return useContext(ScrollPositionContext);
}
