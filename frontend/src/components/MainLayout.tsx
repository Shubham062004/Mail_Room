
import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Outlet />
        <div className="mt-auto py-2 bg-indigo-700 text-white text-center text-sm">
          Copyright © 2023 Digielves Tech Wizards Private Limited. All rights reserved
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
