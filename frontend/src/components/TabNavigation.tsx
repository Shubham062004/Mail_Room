
import React from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

interface TabNavigationProps {
  tabs: {
    label: string;
    value: string;
    path: string;
  }[];
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full flex justify-center my-4">
      <div className="inline-flex rounded-lg bg-gray-300 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => navigate(tab.path)}
            className={cn(
              "px-6 py-2 rounded-md text-sm font-medium transition-colors",
              location.pathname === tab.path
                ? "bg-white text-gray-800"
                : "text-gray-600 hover:text-gray-800"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
