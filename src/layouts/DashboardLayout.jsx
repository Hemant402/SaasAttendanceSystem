// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";
//
//
// export default function DashboardLayout() {
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar />
//
//       {/* Main content */}
//       <div className="flex flex-col flex-1">
//         <Topbar />
//
//         <main className="flex-1 p-6">
//           <Outlet />
//         </main>
//
//         {/* Footer */}
//         <footer className="py-3 text-sm font-semibold text-center text-gray-600 bg-white border-t">
//           © Z1 Technology & Trade Pvt. Ltd. | For Support & Inquiry: 071-590132,
//           9857050123 | support@z1hrm.com
//         </footer>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar with smooth collapse */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <Topbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="py-3 text-sm font-semibold text-center text-gray-600 bg-white border-t">
          © Z1 Technology & Trade Pvt. Ltd. | For Support & Inquiry:
          071-590132, 9857050123 | support@z1hrm.com
        </footer>
      </div>
    </div>
  );
}
