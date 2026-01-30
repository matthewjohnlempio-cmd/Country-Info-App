import React from "react";
import { FaReact, FaCss3Alt, FaCode } from "react-icons/fa";
import { SiTailwindcss, SiAxios } from "react-icons/si";
import { LuScanEye } from "react-icons/lu";
import { TbBrandGoogleMaps } from "react-icons/tb";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 mt-12 w-full">
      <div className="max-w-7xl mx-auto py-6 px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Author */}
        <div className="text-sm flex items-center gap-1">
          <LuScanEye className="text-green-400" size={18} />
          Made by <span className="font-semibold text-white">Matthew</span>
        </div>

        {/* Tools Used */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <FaReact className="text-blue-400" /> React
          </div>
          <div className="flex items-center gap-1">
            <SiTailwindcss className="text-teal-400" /> Tailwind
          </div>
          <div className="flex items-center gap-1">
            <SiAxios className="text-green-500" /> Axios
          </div>
          <div className="flex items-center gap-1">
            <TbBrandGoogleMaps className="text-red-500" /> Google Maps
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
