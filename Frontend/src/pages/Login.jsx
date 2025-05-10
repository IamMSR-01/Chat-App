import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const { login, isLoggingIn } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 sm:p-12 w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Welcome Back 👋
        </h2>
        <form 
        onSubmit={handleSubmit}
        className="space-y-5">
          {/* Email */}
          <div>
            <label className=" block mb-1 text-sm">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-white rounded-xl bg-black  placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div>
            <label className=" block mb-1 text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 text-white rounded-xl bg-black placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400 pr-10"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute top-2.5 right-3 text-gray-300 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition duration-200"
          >
            {
              isLoggingIn ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Login"
              )
            }
          </button>

          <div className="text-center mt-4">
            <p className="text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-cyan-500 hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
