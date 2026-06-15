import Navbar from "@/components/Navbar";
import React from "react";
import Footer from "../sections/FooterSection";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#eef2ec] via-[#f3ede3] to-[#faf8f3]">
      <main className="min-h-screen relative">
        {children}
      </main>
    </div>
  );
}

export default Layout;
