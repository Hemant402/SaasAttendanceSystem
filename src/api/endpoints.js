export const API = {
  CREATE_DEALER: "/SuperAdmin/create-dealer",
  GET_ALL_DEALERS: "/SuperAdmin/all-dealers",
  UPDATE_DEALER: (id) => `/SuperAdmin/update-dealer/${id}`,
  GET_SYSTEM_SETTINGS: "/SuperAdmin/system-settings",
  UPDATE_SYSTEM_SETTINGS: "/SuperAdmin/update-settings",
  DEALER_OFFICES: "/Dealer/my-offices",
  CREATE_OFFICE: "/Dealer/register-office",
  LOGIN: "/auth/login",
  OFFICE_STATS: "/SuperAdmin/office-stats",
  GET_ALL_OFFICES: "/SuperAdmin/all-offices",
  APPROVE_OFFICE: "/SuperAdmin/approve-office",
  UPDATE_OFFICE: (id) => `/SuperAdmin/update-office/${id}`,
};
