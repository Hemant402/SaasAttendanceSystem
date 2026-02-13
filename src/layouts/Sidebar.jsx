import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import menuConfig from "./menuConfig";
import { useAuth } from "../auth/AuthProvider";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const { user } = useAuth();
  const menus = menuConfig[user?.userType] || [];
  const location = useLocation();
  const { t } = useTranslation();


  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (label) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <aside className="w-64 bg-white border-r min-h-screen">
      {/* Brand Header */}
      <div className="flex items-center gap-2 px-4 py-5 border-b">
        <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold">
          SA
        </div>
        <span className="text-lg font-bold text-gray-800">
          SaaS Attendance
        </span>
      </div>

      {/* Menu */}
      <nav className="px-3 py-4 space-y-1">
        {menus.map((menu) => {
          // MENU WITH SUB-MENUS
          if (menu.children) {
            const isActiveGroup = menu.children.some(
              (c) => location.pathname === c.path
            );

            return (
              <div key={menu.label}>
                <button
                  onClick={() => toggleMenu(menu.label)}
                  className={`w-full flex justify-between items-center px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActiveGroup
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {t(menu.label)}
                  <span className="text-xs">
                    {openMenu === menu.label ? "▲" : "▼"}
                  </span>
                </button>

                {openMenu === menu.label && (
                  <div className="ml-4 mt-1 space-y-1">
                    {menu.children.map((sub) => (
                      <NavLink
                        key={sub.path}
                        to={sub.path}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-md text-sm transition ${
                            isActive
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-600 hover:bg-gray-100"
                          }`
                        }
                      >
                        {t(sub.label)}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // NORMAL MENU
          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {t(menu.label)}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
