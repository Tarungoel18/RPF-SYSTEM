import { ROUTES } from "./RoutesConst.js";

export const ROLE = {
  ADMIN: "admin",
  VENDOR: "vendor",
};

export const ADMIN_SIDEBAR_MENU = [
  {
    label: "Home",
    to: ROUTES.ADMIN_DASHBOARD,
    icon: "mdi mdi-file-document-box-outline",
  },
  {
    label: "Categories",
    to: ROUTES.CATEGORIES,
    icon: "mdi mdi-receipt",
  },
  {
    label: "Vendors",
    to: ROUTES.VENDORS_LIST,
    icon: "mdi mdi-flip-vertical",
  },
  {
    label: "RFP Lists",
    to: ROUTES.RFP_LIST,
    icon: "mdi mdi-apps",
  },
];

export const VENDOR_SIDEBAR_MENU = [
  {
    label: "Dashboard",
    to: ROUTES.VENDOR_DASHBOARD,
    icon: "mdi mdi-file-document-box-outline",
  },
  {
    label: "RFP For Quotes",
    to: ROUTES.RFP_FOR_QUOTES,
    icon: "mdi mdi-receipt",
  },
];