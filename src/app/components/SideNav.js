"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const SideNav = () => {
  const links = [
    {
      label: "Dashboard",
      url: "/dashboard",
      subLinks: [],
    },
    {
      label: "Inventory",
      url: "/inventory",
      subLinks: [
        {
          label: "Add Categories",
          url: "/inventory/add-categories",
        },
        {
          label: "Add Products",
          url: "/inventory/add-products",
        },
        {
          label: "Add Brand",
          url: "/inventory/add-brand",
        },
        {
          label: "Update Categories",
          url: "/inventory/update-categories",
        },
        {
          label: "Update Brand",
          url: "/inventory/update-brand",
        },
        {
          label: "Retrive Products",
          url: "/inventory/retrive-products",
        },
      ],
    },
    {
      label: "User Management",
      url: "/user-management",
      subLinks: [],
    },
    {
      label:'Orders',
      url:'/orders',
      subLinks: []
    }
  ];

  const pathname = usePathname();
  const router = useRouter();

  const handleParentClick = (subLinkUrl) => {
    router.push(subLinkUrl);
  };

  return (
    <div className="h-[98vh] fixed top-0 left-0 w-[18vw] bg-black flex flex-col gap-2 justify-between m-1 rounded-md py-4">
      <div className=" h-[78%]">
        <h1 className="text-white text-center text-[25px] font-[500] flex items-center px-6 py-2 font-serif italic">
          E-commerce Dashboard
        </h1>
        {/* Dashboard menu items */}
        <div className="h-fit overflow-auto scrollbar-thin max-h-[90%]">
          {links.map((link) => (
            <div key={link.label}>
              <div
                onClick={() =>
                  link.subLinks.length > 0 &&
                  handleParentClick(link.subLinks[0].url)
                }
                className={`text-white w-[90%] mx-auto  flex flex-col  font-[500] transition-all duration-400 ease-in-out ${
                  pathname === link.url || pathname.startsWith(link.url)
                    ? " "
                    : ""
                }`}
              >
                {link.subLinks?.length === 0 ? (
                  <Link href={link.url}>
                    <p
                      className={`w-full h-full mb-1 mt-2 px-4 py-2 ${
                        pathname === link.url ? "bg-[#ffffffe6] text-black" : ""
                      } rounded-md`}
                    >
                      {link.label}
                    </p>
                  </Link>
                ) : (
                  <div
                    className={`w-full h-full px-4 py-2 cursor-pointer ${
                      pathname.startsWith(link.url)
                        ? "bg-[#ffffff6e] rounded-t-md"
                        : ""
                    } flex items-center justify-between`}
                  >
                    {link.label}
                    {link.subLinks.length > 0 && (
                      <span
                        className={`${
                          pathname.startsWith(link.url) && "rotate-[90deg]"
                        } transition-all ease-in-out duration-900`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289Z"
                            fill="white"
                          ></path>
                        </svg>
                      </span>
                    )}
                  </div>
                )}
              </div>
              {link.subLinks.length > 0 && pathname.startsWith(link.url) && (
                <div className="transition-all ease-in-out w-[90%] mx-auto rounded-b-md pb-2 mb-2  bg-[#ffffff6e] text-black flex flex-col gap-2">
                  {link.subLinks.map((subLink) => (
                    <Link key={subLink.url} href={subLink.url}>
                      <p
                        className={`${
                          pathname === subLink.url
                            ? "bg-[#ffffffe6] "
                            : "text-white"
                        } px-2 w-[90%] ml-auto transition-all ease-in-out duration-500 font-[500] mr-2 py-2 rounded-lg`}
                      >
                        {subLink.label}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="cursor-pointer " onClick={() => signOut()}>
        <p
          className="w-[90%] flex items-center rounded-md font-[700] hover:bg-[#ffffff82] transition-all ease-in-out
        duration-200 px-4 py-2 bg-white text-black m-2 cursor-pointer"
        >
          {" "}
          Sign Out
        </p>
      </div>
    </div>
  );
};

export default SideNav;
