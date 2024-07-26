export { default } from "next-auth/middleware";
export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/inventory/add-categories",
    "/inventory/add-products",
    "/inventory/add-brand",
    "/inventory/update-categories",
    "/inventory/update-brand",
    "/inventory/retrive-products",
    "/user-management",
  ],
};
