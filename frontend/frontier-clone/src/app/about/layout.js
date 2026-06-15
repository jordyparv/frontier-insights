import Navbar from "@/components/Navbar";
import React from "react";
import FooterSection from "../sections/FooterSection";

export default function layout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}
