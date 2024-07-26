"use client";

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import SessionProvider from "./components/SessionProvider";
import SideNav from "./components/SideNav";

const inter = Inter({ subsets: ["latin"] });

const ClientLayout = ({ children }) => {
  const pathname = usePathname();

  // Define the paths where the SideNav should not be rendered
  const noSideNavPaths = [
    "/login",
    "/register",
    "/404",
    "/forgot-password",
    "/reset-password",
  ];

  // Check if the current pathname is in the list of paths where SideNav should not be rendered
  const shouldRenderSideNav = !noSideNavPaths.includes(pathname);

  return (
    <div className={inter.className}>
      <SessionProvider>
        <nav></nav>
        <main
          className={`flex gap-2  ${
            !shouldRenderSideNav ? "px-2" : "pl-[19vw] pr-2 "
          }`}
        >
          {shouldRenderSideNav && <SideNav />}
          <div className=" rounded-md my-2 w-full">{children}</div>
        </main>
        <footer></footer>
      </SessionProvider>
    </div>
  );
};

export default ClientLayout;
