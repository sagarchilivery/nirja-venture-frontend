import React, { ReactNode } from "react";
import Navbar from "./navbar";

export default function Base({ children }: any) {
  return (
    <div className=" bg-[#080c25] text-white flex">
      <div className=" flex flex-col overflow-hidden ">
        <div className="w-screen flex-col flex ">
          <div className="bg-blue-500">
            <Navbar />
          </div>
          <div className="w-screen min-h-screen">{children}</div>
        </div>
      </div>
    </div>
  );
}
