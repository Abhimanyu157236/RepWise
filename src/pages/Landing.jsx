"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function Landing({ text = "RepWise." }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[url('/bg.jpg')] object-cover  text-white flex flex-col justify-center items-center h-screen ">
      <div className="flex">
        <AnimatePresence>
          {text.split("").map((char, i) => (
            <motion.p
              ref={ref}
              key={i}
              initial={{ opacity: 0, x: -28 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              exit="hidden"
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="text-7xl text-center sm:text-4xl font-bold lg:text-9xl md:leading-[4rem] text-transparent bg-clip-text bg-gradient-to-r from-[#ffe5c1]  to-[#ff8400]"
            >
              {char === " " ? <span>&nbsp;</span> : char}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        className="mt-8 px-7 lg:px-16 py-4 text-white text-xl lg:text-2xl text-center rounded-full hover:scale-105 bg-[linear-gradient(to_right,_#000000_0%,_#0f9b0f_51%,_#000000_100%)] bg-[length:200%_auto] transition-all duration-500 hover:bg-[position:right_center] hover:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1}}
        transition={{
          duration: 1.4,
          delay: 1.2,
          
        }}
      >
        <p
          onClick={() => navigate("/workout")}
        >Get Started</p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="text-xl lg:text-2xl text-center mt-4 lg:mt-8"
      >
        A Platform To Track Your Fitness Journey
      </motion.p>
    </div>
  );
}
