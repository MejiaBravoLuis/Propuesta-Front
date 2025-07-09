import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const Tooltip = ({ content, position = "right" }) => {
  const tooltipRef = useRef(null);
  const [calculatedPosition, setCalculatedPosition] = useState(position);

  useEffect(() => {
    // Asegurarse que el tooltip no se salga de la pantalla
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        setCalculatedPosition("left");
      }
    }
  }, []);

  const positions = {
    right: {
      left: "100%",
      top: "50%",
      translate: "translate(8px, -50%)",
      arrow: "right-full top-1/2 -translate-y-1/2"
    },
    left: {
      right: "100%",
      top: "50%",
      translate: "translate(-8px, -50%)",
      arrow: "left-full top-1/2 -translate-y-1/2"
    }
  };

  const currentPos = positions[calculatedPosition] || positions.right;

  return (
    <motion.div
      ref={tooltipRef}
      initial={{ opacity: 0, x: calculatedPosition === "right" ? 5 : -5 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className={`absolute z-50 px-3 py-2 text-sm bg-gray-900 text-white rounded-md shadow-lg whitespace-nowrap`}
      style={{
        [currentPos.left ? "left" : "right"]: currentPos.left || currentPos.right,
        top: currentPos.top,
        transform: currentPos.translate
      }}
    >
      {content}
      <div className={`absolute w-2 h-2 bg-gray-900 rotate-45 ${currentPos.arrow}`} />
    </motion.div>
  );
};