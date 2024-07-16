export { default } from "next-auth/middleware";
export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/inventory/add-categories",
    "/inventory/add-products",
  ],
};
