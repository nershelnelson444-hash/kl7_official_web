import React, { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { durations } from "../utils/motionTokens";

interface CountUpProps {
    targetNumber: number;
    duration?: number;
    font?: string;
    color?: string;
    fontSize?: number;
    lineHeight?: number;
    fontWeight?: string;
    style?: React.CSSProperties;
    suffix?: string;
}

export default function CountUp(props: CountUpProps) {
    const {
        targetNumber = 100,
        duration = durations.countUp,
        font = "Space Grotesk, sans-serif",
        color = "#000000",
        fontSize = 54,
        lineHeight = 54,
        fontWeight = "400",
        style,
        suffix = "+"
    } = props;
    
    // Start from a 10% baseline rather than 0 for exact Framer match
    const baseline = Math.max(1, Math.floor(targetNumber * 0.1));
    const [count, setCount] = useState(baseline);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    
    const motionValue = useMotionValue(baseline);
    
    // Smooth deceleration spring
    const springValue = useSpring(motionValue, {
        stiffness: 40,
        damping: 15,
        mass: 1,
    });

    useEffect(() => {
        if (isInView) {
            motionValue.set(targetNumber);
        }
    }, [isInView, motionValue, targetNumber]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            setCount(Math.floor(latest));
        });
    }, [springValue]);

    const containerStyle: React.CSSProperties = {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        overflow: "hidden",
        ...style
    };

    return (
        <div style={containerStyle} ref={ref}>
            <span
                style={{
                    letterSpacing: "0em",
                    textAlign: "center",
                    margin: "0",
                    fontFamily: font,
                    color: color,
                    fontSize: `${fontSize}px`,
                    lineHeight: `${lineHeight}px`,
                    fontWeight: fontWeight,
                    opacity: isInView ? 1 : 0,
                    transition: "opacity 0.6s ease-out",
                }}
            >
                {count.toLocaleString()}{suffix}
            </span>
        </div>
    );
}
