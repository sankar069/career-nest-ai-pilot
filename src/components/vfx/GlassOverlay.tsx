
import { motion } from "framer-motion";

export function GlassOverlay() {
  return (
    <motion.div
      className="absolute z-10 inset-0 pointer-events-none"
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 0.92, backdropFilter: "blur(16px)" }}
      transition={{ duration: 1.36, ease: "easeInOut" }}
      style={{
        background:
          "linear-gradient(120deg, rgba(53,44,246,0.22) 0%, rgba(97,229,252,0.16) 51%, rgba(151,255,92,0.13) 100%)",
        boxShadow: "0 10px 48px 0 rgba(93,27,206,0.08)",
      }}
    />
  );
}
