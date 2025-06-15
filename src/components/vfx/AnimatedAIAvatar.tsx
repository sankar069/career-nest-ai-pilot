
import { Player } from "lottie-react";
import { motion } from "framer-motion";
// Example Lottie AI/robot animation from public CDN, or replace with your own
const sampleAIUrl = "https://lottie.host/30be8743-0157-4bf9-94f4-8c09bf7f9f8a/eNvesccX5A.json";

export function AnimatedAIAvatar() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0.3, filter: "blur(3px)" }}
      animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
      transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.7 }}
      className="w-32 md:w-40 mx-auto mb-2 drop-shadow-xl"
      aria-label="AI Avatar"
    >
      <Player
        autoplay
        loop
        src={sampleAIUrl}
        style={{ width: "100%", height: "100%" }}
      />
    </motion.div>
  );
}
