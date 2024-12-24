import React from "react";

export function useScrollableWithBorder<T extends HTMLElement>(dependcies: any[] = []) {
    const contentRef = React.useRef<T>(null);
    const [showBorder, setShowBorder] = React.useState(false);

    React.useEffect(() => {
        const checkScrollable = () => {
            if (contentRef.current) {
                const isScrollable = contentRef.current.scrollHeight > contentRef.current.clientHeight;
                setShowBorder(isScrollable);
            }
        }

        checkScrollable();
        window.addEventListener("resize", checkScrollable);

        return () => window.removeEventListener("resize", checkScrollable);
    }, [contentRef, ...dependcies]);

    return { contentRef, showBorder };
}