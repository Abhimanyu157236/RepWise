import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showError, setShowError] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://repwise-58m2.onrender.com/api/v2/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await res.json();
    setShowPopup(true);
    setMsg(data.message);
    if (data.message != "User created successfully") {
      setShowError(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://repwise-58m2.onrender.com/api/v2/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if(!res.ok){
      setShowPopup(true);
      setShowError(true); 
      setMsg(data.message || "Login failed. Please try again.");
      return;
    }
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.name);
    setShowPopup(true);
    setMsg(data.message);
    if (data.message != "login Successfull,Redirecting to dashboard...") {
      setShowError(true);
    }
  };
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("name");

  if (showPopup) {
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  }
  if (showError) {
    setTimeout(() => {
      setShowError(false);
    }, 2000);
  }

  if (msg === "login Successfull,Redirecting to dashboard...") {
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  }

  return (
    <div className="h-screen w-full overflow-y-scroll text-white py-7 px-5 md:px-[4%] flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className=" py-8 px-8 md:px-14 w-[95%] md:h-[70%] md:w-1/3 bg-gradient-to-br from-pink-800/20 to-purple-950/20 backdrop-blur-md rounded-2xl shadow-inner shadow-white/30"
      >
        {/* Toggle */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 text-sm font-semibold transition rounded-l-xl ${
              isLogin
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                : "bg-zinc-800 text-gray-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 text-sm font-semibold transition rounded-r-xl ${
              !isLogin
                ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg"
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
              <h2 className="text-white text-xl font-semibold text-center">
                Welcome Back 👋
              </h2>
              {showPopup && (
                <p
                  className={`text-center font-semibold ${showError ? "text-red-500" : "text-green-500"}`}
                >
                  {msg}
                </p>
              )}
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-white/10 text-white border border-zinc-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg  bg-white/10 text-white border border-zinc-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="w-full p-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:opacity-90 transition"
                onClick={handleLogin}
              >
                Login
              </button>
              <p className="text-sm text-gray-400 text-center">
                New User?{" "}
                <span className="text-purple-400 cursor-pointer">Sign up</span>
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
              <h2 className="text-white text-xl font-semibold text-center">
                Create Account 🚀
              </h2>
              {showPopup && (
                <p
                  className={`text-center font-semibold ${showError ? "text-red-500" : "text-green-500"}`}
                >
                  {msg}
                </p>
              )}
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg  bg-white/10 text-white border border-zinc-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none transition"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg  bg-white/10 text-white border border-zinc-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg  bg-white/10 text-white border border-zinc-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="w-full p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-lg hover:opacity-90 transition"
                onClick={handleSignup}
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
  );
}
