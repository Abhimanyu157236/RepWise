import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { account, databases, ID } from "../../service/appwrite";
import { useAuth } from "../context/AuthProvider";
import { Check, TriangleAlert } from "lucide-react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [name, setName] = useState(""); 
  const [showPopup,setShowPopup] = useState(false)
  const [showError,setShowError] = useState(false)
  const {setUser} = useAuth()


  const handleSubmit = async(e) =>{
     e.preventDefault();

     try {
      
    if(isLogin == false){
      
        const User = await account.create(
          ID.unique(),
          email,
          password,
        ) 
        setShowPopup(true)
      } 
      else{
        const session = await account.createEmailPasswordSession(email,password)
        setUser(session)
        console.log("login successfull")
        setShowPopup(true)
        
      }
     } catch (error) {
     console.log(error)
      setShowError(true)
     }
    }

    if(showPopup){
       setTimeout(() => {
          setShowPopup(false)
        },1500);
        
    }
      if(showError){
       setTimeout(() => {
          setShowError(false)
        },1500);
        
    }


  return (
    <div className="w-full h-screen overflow-y-scroll bg-black ">
    <div className={`w-[74%] lg:w-1/5 flex bg-white rounded-lg py-1 px-4 border-b-8 ${showError?"border-[#c20000]":"border-[#2b5c0a]"} relative top-[65%] lg:top-[80%] left-[15%] lg:left-[40%] ${showPopup || showError?"block":"hidden"}`}>
     { showPopup?
     <>
     <Check size={45} color="#2b5c0a" strokeWidth={4} />
      <h1 className="text-xl font-semibold py-1 text-[#2b5c0a] ml-4 ">
        {isLogin ? "Login Successfully" : "Account Created Successfully"}
      </h1>
      </> 
      :  <>
     <TriangleAlert size={45} color="#c20000" strokeWidth={2} />
      <h1 className="text-xl font-semibold py-1 text-[#c20000]  ml-4 ">
        Sorry can't Login
      </h1>
      </> 
      }
      </div>
    <div className="w-full bg-black flex items-center justify-center p-4">
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-zinc-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-zinc-800"
      >
        {/* Toggle */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 text-sm font-semibold transition rounded-l-xl ${
              isLogin
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                : "bg-zinc-800 text-gray-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 text-sm font-semibold transition rounded-r-xl ${
              !isLogin
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                : "bg-zinc-800 text-gray-300"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Forms */}
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-white text-3xl font-bold text-center">Welcome Back 👋</h2>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
                 onChange={(e)=>setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
                 onChange={(e)=>setPassword(e.target.value)}
              />
              <button className="w-full p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:opacity-90 transition"
              onClick={handleSubmit}
              >
                Login
              </button>
              <p className="text-sm text-gray-400 text-center">
               New User? <span className="text-purple-400 cursor-pointer">Sign up</span>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-white text-3xl font-bold text-center">Create Account 🚀</h2>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none transition"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                onChange={(e)=>setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                 onChange={(e)=>setPassword(e.target.value)}
              />
              <button className="w-full p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg hover:opacity-90 transition"
               onClick={handleSubmit}
              >
                Sign Up
              </button>
              <p className="text-sm text-gray-400 text-center">
                Already have an account?{" "}
                <span
                  onClick={() => setIsLogin(true)}
                  className="text-cyan-400 cursor-pointer"
                >
                  Login
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
    </div>
  );
}
