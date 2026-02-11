const menuConfig = {
  SuperAdmin: [
    { label: "Dashboard", path: "/dashboard/superadmin" },
    { label: "Dealers", path: "/dashboard/superadmin/dealers" },
    { label: "Offices", path: "/dashboard/superadmin/offices" }, // ✅ NEW
    { label: "System Settings", path: "/dashboard/superadmin/settings" },
  ],

  Dealer: [{label: "Dashboard", path: "/dashboard/dealer",},
          {label: "Offices", 
            children: [{label: "Offices List", path: "/dashboard/dealer/offices",},
                       {label: "Create Office", path: "/dashboard/dealer/offices/create",},],
          },
          ],

  OfficeAdmin: [{ label: "Dashboard", path: "/dashboard/officeadmin" }],
};

export default menuConfig;
