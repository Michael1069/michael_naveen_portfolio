// SliceableBox.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SliceableBox = ({ children }) => {
  const [fallen, setFallen] = useState(false);
  const [fallProps, setFallProps] = useState({});

  // Expose a function to trigger fall (we’ll hook it into KatanaSlash)
  useEffect(() => {
    const handleSlice = (e) => {
      const box = e.detail?.targetBox;
      if (box && box === children?.key) {
        // mark as falling
        setFallen(true);
        setFallProps({
          y: 1000, // drop down off screen
          rotate: Math.random() > 0.5 ? 45 : -45,
          opacity: 0,
          transition: { duration: 1, ease: "easeIn" },
        });
      }
    };

    window.addEventListener("katana-slice", handleSlice);
    return () => window.removeEventListener("katana-slice", handleSlice);
  }, [children]);

  return (
    <motion.div
      layout
      animate={fallen ? fallProps : {}}
      className="rounded-3xl border border-zinc-800 bg-neutral-900 p-6 relative overflow-hidden"
    >
      {children}
    </motion.div>
  );
};

export default SliceableBox;
