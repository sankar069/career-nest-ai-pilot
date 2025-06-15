import Player from "lottie-react";
import { motion } from "framer-motion";
// Lottie animation, import as JSON
// If you prefer to keep using a remote file, fetch and load it, otherwise import a file.
import aiAnimation from "./ai-avatar.json"; // Place the JSON in this directory as ai-avatar.json

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
        animationData={aiAnimation}
        style={{ width: "100%", height: "100%" }}
      />
    </motion.div>
  );
}
