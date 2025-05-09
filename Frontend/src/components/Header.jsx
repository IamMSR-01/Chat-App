import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Settings, UserRoundPen, X } from "lucide-react";
import { useAuthStore } from "../store/authStore.js";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout, authUser } = useAuthStore();

  return (
    <header className="w-full sticky px-4 sm:px-6 py-4 bg-white/10 backdrop-blur-md border rounded-2xl border-white/20 shadow-md bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-white">
          MyApp
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-10">
          <Link
            to="/settings"
            className="text-white hover:text-cyan-400 transition duration-200 flex items-center justify-center gap-2"
          >
            <Settings className="w-6 h-6" />
            <span className="text-lg font-semibold">Settings</span>
          </Link>

          {authUser ? (
            <>
              <Link
                to="/profile"
                className="text-white hover:text-cyan-400 transition duration-200 flex items-center justify-center gap-2"
              >
                <div>
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white"
                    src={
                      authUser.avatar ||
                      `https://ui-avatars.com/api/?name=${authUser.fullName
                        .trim()
                        .split(" ")
                        .slice(0, 2)
                        .map((n) => n[0].toUpperCase())
                        .join(" ")}`
                    }
                    alt=""
                  />
                </div>
                <span className="text-lg font-semibold">
                  {authUser.fullName}
                </span>
              </Link>

              <button
                onClick={logout}
                className="text-white hover:text-cyan-400 transition duration-200 flex items-center justify-center gap-2"
              >
                <LogOut />
                <span className="text-lg font-semibold">Logout</span>
              </button>
            </>
          ) : (
            <></>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-6 space-y-2 pb-4">
          <Link
            to="/settings"
            className="block text-white hover:text-cyan-400 transition duration-200"
            onClick={() => setMenuOpen(false)}
          >
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </div>
          </Link>
          {authUser ? (
            <>
              <Link
                to="/profile"
                className="block text-white hover:text-cyan-400 transition duration-200"
                onClick={() => setMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <div>
                    <img
                      className="w-5 h-5 rounded-full border-2 border-white"
                      src={authUser.avatar}
                      alt=""
                    />
                  </div>
                  <span>{authUser.fullName}</span>
                </div>
              </Link>

              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="block text-white hover:text-cyan-400 transition duration-200"
              >
                <div className="flex items-center gap-2">
                  <LogOut />
                  <span>Logout</span>
                </div>
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
