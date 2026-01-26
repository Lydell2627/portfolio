"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = theme === "dark";

    if (!mounted) {
        return (
            <div className="w-[3.2em] h-[1.8em] rounded-full bg-neutral-200 dark:bg-neutral-700"
                style={{ fontSize: '14px' }}
            />
        );
    }

    return (
        <label
            className="theme-switch"
            style={{ fontSize: '14px' }}
        >
            <input
                type="checkbox"
                checked={!isDark}
                onChange={() => setTheme(isDark ? "light" : "dark")}
                className="sr-only"
            />
            <span className="theme-slider">
                {/* Stars (visible in dark mode) */}
                <div className="star star-1" />
                <div className="star star-2" />
                <div className="star star-3" />
                {/* Cloud (visible in light mode) */}
                <svg viewBox="0 0 16 16" className="cloud">
                    <path
                        transform="matrix(.77976 0 0 .78395-299.99-418.63)"
                        fill="#fff"
                        d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
                    />
                </svg>
            </span>

            <style jsx>{`
                .theme-switch {
                    position: relative;
                    display: inline-block;
                    width: 3.2em;
                    height: 1.8em;
                    border-radius: 30px;
                    cursor: pointer;
                }

                .theme-slider {
                    position: absolute;
                    cursor: pointer;
                    inset: 0;
                    background-color: #1a1a2e;
                    transition: 0.4s;
                    border-radius: 30px;
                    overflow: hidden;
                }

                .theme-slider:before {
                    position: absolute;
                    content: "";
                    height: 1.1em;
                    width: 1.1em;
                    border-radius: 50%;
                    left: 0.35em;
                    bottom: 0.35em;
                    transition: 0.4s;
                    transition-timing-function: cubic-bezier(0.81, -0.04, 0.38, 1.5);
                    box-shadow: inset 6px -3px 0px 0px #fff;
                }

                input:checked + .theme-slider {
                    background-color: #87CEEB;
                }

                input:checked + .theme-slider:before {
                    transform: translateX(1.4em);
                    box-shadow: inset 12px -3px 0px 12px #FFD93D;
                }

                .star {
                    background-color: #fff;
                    border-radius: 50%;
                    position: absolute;
                    width: 3px;
                    height: 3px;
                    transition: all 0.4s;
                }

                .star-1 {
                    left: 2em;
                    top: 0.4em;
                }

                .star-2 {
                    left: 1.7em;
                    top: 1em;
                }

                .star-3 {
                    left: 2.4em;
                    top: 0.7em;
                }

                input:checked ~ .theme-slider .star {
                    opacity: 0;
                }

                .cloud {
                    width: 2.8em;
                    position: absolute;
                    bottom: -1em;
                    left: -0.8em;
                    opacity: 0;
                    transition: all 0.4s;
                }

                input:checked ~ .theme-slider .cloud {
                    opacity: 1;
                }
            `}</style>
        </label>
    );
}
