"use client";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function FadeIn({ children, delay = 0, y = 24, as = "div", className }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

export function RevealText({ text, className, as = "h1" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="mask" aria-hidden>
          <motion.span
            style={{ display: "inline-block" }}
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Magnetic({ children, strength = 0.25 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const move = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const reset = () => ref.current && (ref.current.style.transform = "");
  return (
    <span ref={ref} onMouseMove={move} onMouseLeave={reset} className="magnetic">
      {children}
    </span>
  );
}