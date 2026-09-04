import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { PrismWordmark } from "@/components/prism/PrismMark";
import { navLinks } from "@/lib/prism";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll lock: preserve position, always restorable, never leaves the page stuck.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const y = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, y);
    };
  }, [open]);

  // Close on Escape and when the viewport grows to the desktop nav.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    onChange();
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);


  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between md:h-20">
        <Link to="/" aria-label="Prism Group home" onClick={() => setOpen(false)}>
          <PrismWordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="link-underline text-[0.8125rem] font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="group hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[0.8125rem] font-medium text-primary-foreground transition-all hover:opacity-90 sm:inline-flex"
          >
            Talk to Prism
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
          >
            {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>
      <div className="spectrum-rule" style={{ opacity: scrolled ? 0.6 : 0.25 }} />

      <AnimatePresence>
        {open && (
          <motion.div
            id="prism-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, pointerEvents: "none" }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="fixed inset-0 top-16 z-40 overflow-y-auto overscroll-contain bg-background lg:hidden"
          >

            <div className="shell flex min-h-full flex-col justify-between py-10">
              <nav aria-label="Mobile" className="flex flex-col">
                {navLinks.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.45 }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-border py-5 font-display text-2xl font-semibold tracking-tight"
                    >
                      {l.label}
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: `var(--prism-colour-${(i % 7) + 1})` }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground"
              >
                Talk to Prism <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
