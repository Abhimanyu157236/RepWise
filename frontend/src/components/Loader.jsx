import { motion } from "motion/react";

function Loader() {
  return (
    <motion.div
      animate="pulse"
      transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
      className="w-full container"
    >
      <motion.div
        className="dot"
        animate={{ y: 5 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          repeat: Infinity,
          duration: 2,
        }}
      />
      <motion.div
        className="dot"
        animate={{ y: 5 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          repeat: Infinity,
          delay: 0.1,
          duration: 2,
        }}
      />
      <motion.div
        className="dot"
        animate={{ y: 5 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          repeat: Infinity,
          delay: 0.2,
          duration: 2,
        }}
      />
      <StyleSheet />
    </motion.div>
  );
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
  return (
    <style>
      {`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 6px;
            }

            .dot {
                width: 9px;
                height: 9px;
                border-radius: 50%;
                background-color: #ffccd5;
                will-change: transform;
            }
            `}
    </style>
  );
}

export default Loader;
