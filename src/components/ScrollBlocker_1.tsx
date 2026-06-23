import React, { useEffect, useCallback, useRef } from "react";

interface ScrollBlockerProps {
    isActive?: boolean;
    style?: React.CSSProperties;
}

export default function ScrollBlocker(props: ScrollBlockerProps) {
    const { isActive = false, style = {} } = props;
    const isLocked = useRef(false);

    const preventScroll = useCallback((e: Event) => {
        if (isActive) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }, [isActive]);

    const preventKeyScroll = useCallback((e: KeyboardEvent) => {
        if (!isActive) return;
        const scrollKeys = ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "PageUp", "PageDown", "Home", "End"];
        if (scrollKeys.includes(e.code) && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, [isActive]);

    useEffect(() => {
        if (typeof window === "undefined" || typeof document === "undefined") return;

        const html = document.documentElement;
        const body = document.body;

        if (isActive && !isLocked.current) {
            isLocked.current = true;
            html.style.touchAction = "none";
            body.style.touchAction = "none";
            window.addEventListener("wheel", preventScroll, { passive: false, capture: true });
            window.addEventListener("touchmove", preventScroll, { passive: false, capture: true });
            window.addEventListener("keydown", preventKeyScroll, { passive: false, capture: true });
        } else if (!isActive && isLocked.current) {
            isLocked.current = false;
            html.style.touchAction = "";
            body.style.touchAction = "";
            window.removeEventListener("wheel", preventScroll, { capture: true });
            window.removeEventListener("touchmove", preventScroll, { capture: true });
            window.removeEventListener("keydown", preventKeyScroll, { capture: true });
        }

        return () => {
            if (isLocked.current) {
                isLocked.current = false;
                html.style.touchAction = "";
                body.style.touchAction = "";
                window.removeEventListener("wheel", preventScroll as EventListener, { capture: true });
                window.removeEventListener("touchmove", preventScroll as EventListener, { capture: true });
                window.removeEventListener("keydown", preventKeyScroll as EventListener, { capture: true });
            }
        };
    }, [isActive, preventScroll, preventKeyScroll]);

    return (
        <div
            style={{
                ...style,
                position: "relative",
                minWidth: "5px",
                minHeight: "5px",
                width: "100%",
                height: "100%",
                pointerEvents: "none",
            }}
        />
    );
}
