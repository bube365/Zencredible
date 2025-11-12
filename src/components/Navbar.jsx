import React from "react";
import { Settings } from "lucide-react";
import logo from "../assets/zenithLogo.svg";

export const Navbar = () => {
  return (
    <>
      {" "}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="lg:w-10 lg:h-10 w-8 h-8 bg-primaryOrange rounded flex items-center justify-center">
                <span className="text-white font-bold text-base lg:text-lg">
                  Zs
                </span>
              </div>
              <span className="font-medium text-[#0A0A0A] tracking-wider text-base lg:text-lg">
                Zensight
              </span>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <img src={logo} alt="logo" className="lg:w-36 w-28" />
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
