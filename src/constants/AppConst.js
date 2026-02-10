import { ROUTES } from "./RoutesConst.js";

export const ROLES = {
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

export const ADD_CATEGORY_BREADCRUMBS = [
  { label: "Home", to: ROUTES.ADMIN_DASHBOARD },
  { label: "Categories", to: ROUTES.CATEGORIES },
  { label: "Add Category", active: true },
];

export const RFP_CREATE_BREADCRUMBS = [
  { label: "Home", to: ROUTES.ADMIN_DASHBOARD },
  { label: "RFP", to: ROUTES.RFP_LIST },
  { label: "RFP Create", active: true },
];

export const HOME_BREADCRUMBS = [{ label: "Home", active: true }];

export const APPLY_QUOTE_BREADCRUMBS = [
  { label: "Home", to: ROUTES.VENDOR_DASHBOARD },
  { label: "RFP", to: ROUTES.RFP_FOR_QUOTES },
  { label: "Apply Quote", active: true },
];

export const CATEGORIES_BREADCRUMBS = [
  { label: "Home", to: ROUTES.ADMIN_DASHBOARD },
  { label: "Categories", active: true },
];

export const RFP_LIST_BREADCRUMBS = [
  { label: "Home", to: ROUTES.VENDOR_DASHBOARD },
  { label: "RFP List", active: true },
];

export const ADMIN_RFP_LIST_BREADCRUMBS = [
  { label: "Home", to: ROUTES.ADMIN_DASHBOARD },
  { label: "RFP List", active: true },
];

export const RFP_QUOTES_BREADCRUMBS = [
  { label: "Home", to: ROUTES.ADMIN_DASHBOARD },
  { label: "RFP", to: ROUTES.RFP_LIST },
  { label: "RFP Quotes", active: true },
];

export const VENDORS_BREADCRUMBS = [
  { label: "Home", to: ROUTES.ADMIN_DASHBOARD },
  { label: "Vendors", active: true },
];

export const TOKEN = "token";
export const ROLE = "role";
export const USER = "user";
