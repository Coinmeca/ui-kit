"use client";
import { useState } from "react";

export default function useModal() {
    const [active, setActive] = useState(true);

    return { active, setActive };
}
