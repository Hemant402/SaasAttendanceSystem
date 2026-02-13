const menuConfig = {
  SuperAdmin: [
    { label: "dashboard", path: "/dashboard/superadmin" },
    { label: "dealers", path: "/dashboard/superadmin/dealers" },
    { label: "offices", path: "/dashboard/superadmin/offices" },
    { label: "systemSettings", path: "/dashboard/superadmin/settings" },
  ],

  Dealer: [{label: "dashboard", path: "/dashboard/dealer",},
          {label: "offices",
            children: [{label: "Offices List", path: "/dashboard/dealer/offices",},
                       {label: "Create Office", path: "/dashboard/dealer/offices/create",},],
          },
          ],

  OfficeAdmin: [{ label: "dashboard", path: "/dashboard/officeadmin" }],
};

export default menuConfig;
