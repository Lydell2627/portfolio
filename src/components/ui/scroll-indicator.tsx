"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => {
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
            }}
        >
            <motion.span
                className="text-xs font-medium tracking-widest uppercase text-neutral-500 dark:text-neutral-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                Scroll
            </motion.span>
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <ChevronDown className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
            </motion.div>
        </motion.div>
    );
}
