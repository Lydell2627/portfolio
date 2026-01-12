"use client";

import Link from "next/link";
import "./animated-button.css";

interface AnimatedButtonProps {
  href: string;
  children: React.ReactNode;
}

export function AnimatedButton({ href, children }: AnimatedButtonProps) {
  return (
    <Link href={href} className="ui-btn">
      <span>{children}</span>
    </Link>
  );
}
