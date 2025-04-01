
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutGrid, 
  ClipboardList, 
  Package,
  Calendar, 
  AlertCircle, 
  HelpCircle, 
  GraduationCap, 
  Clock, 
  MessageSquare, 
  Users, 
  CalendarClock, 
  CreditCard,
  Menu
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);

  const menuItems = [
    { icon: LayoutGrid, text: "Dashboard", path: "/" },
    { icon: ClipboardList, text: "Project Management", path: "/project-management" },
    { icon: ClipboardList, text: "Task Management", path: "/task-management" },
    { icon: Calendar, text: "Calendar", path: "/calendar" },
    { icon: AlertCircle, text: "Compliance Tracker", path: "/compliance" },
    { icon: HelpCircle, text: "Service Desk", path: "/service-desk" },
    { icon: GraduationCap, text: "Skill Grow", path: "/skill-grow" },
    { icon: Clock, text: "Attendance", path: "/attendance" },
    { icon: MessageSquare, text: "Communication", path: "/communication" },
    { icon: Users, text: "Meeting", path: "/meeting" },
    { icon: CalendarClock, text: "WorkSpace Bookings", path: "/workspace-bookings" },
    { icon: CreditCard, text: "Business Card", path: "/business-card" },
  ];

  return (
    <div className={`h-screen bg-indigo-700 text-white ${collapsed ? 'w-16' : 'w-60'} transition-all duration-300 flex flex-col`}>
      <div className="p-4 flex justify-between items-center">
        {!collapsed && <span className="font-bold">Menu</span>}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-indigo-600"
        >
          <Menu size={24} />
        </button>
      </div>
      
      <div className="border-t border-indigo-600 py-4 flex items-center px-4">
        <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
        {!collapsed && (
          <div className="ml-3">
            <span className="block text-sm font-medium">Sham Sarkar</span>
            <div className="flex items-center">
              <span className="text-xs bg-gray-200 text-gray-800 px-1 rounded">P</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <nav className="px-2 py-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center px-2 py-2 rounded-md
                    ${location.pathname === item.path ? 'bg-indigo-800' : 'hover:bg-indigo-600'}
                    transition-colors duration-200
                  `}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {!collapsed && <span className="ml-3">{item.text}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="border-t border-indigo-600 p-4 text-xs text-center">
        {!collapsed && "Copyright © 2023 Digielves Tech Wizards Private Limited. All rights reserved"}
      </div>
    </div>
  );
};

export default Sidebar;
