import { motion } from "framer-motion";

export default function PoppingTitle() {
  return (
    <motion.h1
      className="lg:text-6xl text-4xl font-bold white text-center"
      style={{ color: ["#A7C7E7"] }}
      animate={{ opacity: [1, 0] }}
      transition={{
        duration: 1.7,       
        repeat: Infinity,   
        repeatType: "mirror" 
        
      }}
    >
      CalorieWise
      <p className="text-center text-sm lg:text-2xl lg:mt-4 mt-2 font-extralight">
        Know How Much To Eat To lose Or Gain Weight
      </p>
    </motion.h1>
  );
}
