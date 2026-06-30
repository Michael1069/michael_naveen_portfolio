import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

import './Masonry.css';

const useMedia = (queries, values, defaultValue) => {
    const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;

    const [value, setValue] = useState(get);

    useEffect(() => {
        const handler = () => setValue(get);
        queries.forEach(q => matchMedia(q).addEventListener('change', handler));
        return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queries]);

    return value;
};

const useMeasure = () => {
    const ref = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (!ref.current) return;
        const ro = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ width, height });
        });
        ro.observe(ref.current);
        return () => ro.disconnect();
    }, []);

    return [ref, size];
};

const Masonry = ({
    items,
    renderItem,
    ease = 'power3.out',
    duration = 0.6,
    stagger = 0.05,
    animateFrom = 'bottom',
    blurToFocus = true
}) => {
    const columns = useMedia(
        ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
        [5, 4, 3, 2],
        1
    );

    const [containerRef, { width }] = useMeasure();
    const [gridItems, setGridItems] = useState([]);
    const [containerHeight, setContainerHeight] = useState(0);

    const getInitialPosition = (item, width, height) => {
        const containerRect = containerRef.current?.getBoundingClientRect();
        // Default fallback
        if (!containerRect) return { x: 0, y: 0 };

        let direction = animateFrom;

        if (animateFrom === 'random') {
            const directions = ['top', 'bottom', 'left', 'right'];
            direction = directions[Math.floor(Math.random() * directions.length)];
        }

        switch (direction) {
            case 'top':
                return { x: item.x, y: -200 };
            case 'bottom':
                return { x: item.x, y: window.innerHeight + 200 };
            case 'left':
                return { x: -200, y: item.y };
            case 'right':
                // Approximate
                return { x: window.innerWidth + 200, y: item.y };
            case 'center':
                return {
                    x: containerRect.width / 2 - width / 2,
                    y: containerRect.height / 2 - height / 2
                };
            default:
                return { x: item.x, y: item.y + 100 };
        }
    };

    const hasMounted = useRef(false);

    // Layout logic
    const layout = () => {
        if (!width || !items.length || !containerRef.current) return;

        const elements = Array.from(containerRef.current.children);
        const colHeights = new Array(columns).fill(0);
        const columnWidth = width / columns;

        // Calculate positions
        const newGridItems = elements.map((el, i) => {
            const item = items[i];
            if (!item) return null; // Safety check

            // Temporarily set width to measure height correctly
            el.style.width = `${columnWidth}px`;

            const height = el.offsetHeight;
            const col = colHeights.indexOf(Math.min(...colHeights));
            const x = columnWidth * col;
            const y = colHeights[col];

            colHeights[col] += height;

            return { ...item, x, y, w: columnWidth, h: height };
        });

        // Filter nulls if any mismatches
        const validItems = newGridItems.filter(Boolean);

        setContainerHeight(Math.max(...colHeights));
        setGridItems(validItems);

        // Animation
        validItems.forEach((item, index) => {
            const selector = `[data-key="${item.id}"]`;
            const animationProps = {
                x: item.x,
                y: item.y,
                width: item.w,
                height: item.h,
                opacity: 1,
                filter: 'blur(0px)'
            };

            if (!hasMounted.current) {
                // Initial render animation
                const initialPos = getInitialPosition({ x: item.x, y: item.y }, item.w, item.h);

                gsap.fromTo(selector,
                    {
                        opacity: 0,
                        x: initialPos.x,
                        y: initialPos.y,
                        width: item.w,
                        height: item.h,
                        ...(blurToFocus && { filter: 'blur(10px)' })
                    },
                    {
                        ...animationProps,
                        duration: 0.8,
                        ease: 'power3.out',
                        delay: index * stagger
                    }
                );
            } else {
                // Update animation
                gsap.to(selector, {
                    ...animationProps,
                    duration: duration,
                    ease: ease,
                    overwrite: 'auto'
                });
            }
        });

        if (validItems.length > 0) {
            hasMounted.current = true;
        }
    };

    useLayoutEffect(() => {
        layout();

        // Observe children for resizing (fixes overlap if content changes height)
        const ro = new ResizeObserver(() => {
            // Debounce or just call layout
            // Since this is layout effect, requestAnimationFrame might be good, but direct call is most accurate
            // To avoid loop, we check if layout actually needs change? 
            // The layout function is cheap enough here.
            layout();
        });

        if (containerRef.current) {
            Array.from(containerRef.current.children).forEach(child => ro.observe(child));
        }

        return () => ro.disconnect();
    }, [width, columns, items, stagger, animateFrom, blurToFocus, duration, ease]);

    return (
        <div ref={containerRef} className="list" style={{ height: containerHeight }}>
            {items.map(item => (
                <div
                    key={item.id}
                    data-key={item.id}
                    className="item-wrapper"
                    style={{
                        width: width / columns, // Ensure initial width for rendering
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        opacity: 0 // Hidden until GSAP shows it
                    }}
                >
                    <div className="item-content-wrapper" style={{ width: '100%' }}>
                        {renderItem ? renderItem(item) : null}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Masonry;
