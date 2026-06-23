import React, { useState, useEffect, startTransition, type CSSProperties } from "react";

interface CarouselProps {
    image1?: { src: string; alt: string };
    image2?: { src: string; alt: string };
    image3?: { src: string; alt: string };
    image4?: { src: string; alt: string };
    image5?: { src: string; alt: string };
    image6?: { src: string; alt: string };
    image7?: { src: string; alt: string };
    image8?: { src: string; alt: string };
    image9?: { src: string; alt: string };
    image10?: { src: string; alt: string };
    image11?: { src: string; alt: string };
    image12?: { src: string; alt: string };
    image13?: { src: string; alt: string };
    image14?: { src: string; alt: string };
    image15?: { src: string; alt: string };
    image16?: { src: string; alt: string };
    image17?: { src: string; alt: string };
    image18?: { src: string; alt: string };
    image19?: { src: string; alt: string };
    image20?: { src: string; alt: string };
    autoPlay?: boolean;
    interval?: number;
    showDots?: boolean;
    showArrows?: boolean;
    arrowColor?: string;
    dotColor?: string;
    activeDotColor?: string;
    borderRadius?: number;
    customLeftArrow?: React.ReactNode;
    customRightArrow?: React.ReactNode;
    style?: CSSProperties;
}

export default function Carousel(props: CarouselProps) {
    const {
        image1, image2, image3, image4, image5, image6, image7, image8, image9, image10,
        image11, image12, image13, image14, image15, image16, image17, image18, image19, image20,
        autoPlay = false,
        interval = 3000,
        showDots = true,
        showArrows = true,
        arrowColor = "#FFFFFF",
        dotColor = "#CCCCCC",
        activeDotColor = "#000000",
        borderRadius = 0,
        customLeftArrow,
        customRightArrow,
        style,
    } = props;

    const allImages = [
        image1, image2, image3, image4, image5, image6, image7, image8, image9, image10,
        image11, image12, image13, image14, image15, image16, image17, image18, image19, image20,
    ];

    const images = allImages.filter((img): img is {src: string, alt: string} => !!(img && img.src && img.src.trim() !== ""));

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!autoPlay || images.length <= 1) return;
        const timer = setInterval(() => {
            startTransition(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length);
            });
        }, interval);
        return () => clearInterval(timer);
    }, [autoPlay, interval, images.length]);

    useEffect(() => {
        if (currentIndex >= images.length && images.length > 0) {
            startTransition(() => {
                setCurrentIndex(0);
            });
        }
    }, [currentIndex, images.length]);

    const goToSlide = (index: number) => {
        startTransition(() => {
            setCurrentIndex(index);
        });
    };

    const goToPrevious = () => {
        startTransition(() => {
            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        });
    };

    const goToNext = () => {
        startTransition(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        });
    };

    if (images.length === 0) {
        return (
            <div style={{ ...style, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F5F5F5", color: "#CCCCCC" }}>
                No images
            </div>
        );
    }

    return (
        <div style={{ ...style, position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: `${borderRadius}px` }}>
            <div style={{ display: "flex", width: "100%", height: "100%", transform: `translateX(-${currentIndex * 100}%)`, transition: "transform 0.5s ease-in-out" }}>
                {images.map((item, index) => (
                    <div key={index} style={{ minWidth: "100%", height: "100%", position: "relative" }}>
                        <img src={item.src} alt={item.alt || `Slide ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                ))}
            </div>

            {showArrows && images.length > 1 && (
                <>
                    <div onClick={goToPrevious} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", cursor: "pointer", zIndex: 10 }}>
                        {customLeftArrow ? customLeftArrow : (
                            <button style={{ background: "rgba(0, 0, 0, 0.5)", border: "none", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="Previous slide">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={arrowColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                        )}
                    </div>
                    <div onClick={goToNext} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", cursor: "pointer", zIndex: 10 }}>
                        {customRightArrow ? customRightArrow : (
                            <button style={{ background: "rgba(0, 0, 0, 0.5)", border: "none", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="Next slide">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={arrowColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        )}
                    </div>
                </>
            )}

            {showDots && images.length > 1 && (
                <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 10 }}>
                    {images.map((_, index) => (
                        <button key={index} onClick={() => goToSlide(index)} style={{ width: 8, height: 8, borderRadius: "50%", border: "none", cursor: "pointer", backgroundColor: index === currentIndex ? activeDotColor : dotColor, transition: "background-color 0.3s ease", padding: 0, minWidth: 8, minHeight: 8 }} aria-label={`Go to slide ${index + 1}`} />
                    ))}
                </div>
            )}
        </div>
    );
}
