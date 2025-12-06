"use client";

import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { checkUserRole } from "@/utils/userUtils";
import { useSession, useUser } from "@clerk/nextjs";
const { Sider } = Layout;

const SideBar = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { session } = useSession();
  const userRole = checkUserRole(session);
  const [dbUserRole, setDbUserRole] = useState<string>("");
  const [collapsed, setCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const handleSetActiveLink = (link: string) => {
    setActiveLink(link);
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/users/${user?.id}`)
      .then((res) => res.json())
      .then((data) => {
        setDbUserRole(data?.data?.role);
        console.log(data?.data?.role);
      });
  }, [user?.id]);

  return (
    <aside className="flex">
      <div className="h-screen px-5 py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-60 ">
        <nav className="mt-4 -mx-3 space-y-6 ">
          <div className="space-y-3 ">
            {(userRole === "admin" || dbUserRole === "admin") && (
              <label className="px-3 text-xs text-gray-500 uppercase ">
                analytics
              </label>
            )}

            {userRole === "admin" && (
              <Link
                className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg  hover:bg-gray-300  hover:text-gray-700 ${
                  activeLink === "/admin"
                    ? "bg-gray-300 text-blue-500"
                    : "text-gray-600"
                }`}
                href="/admin"
                onClick={() => handleSetActiveLink("/admin")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                  />
                </svg>

                <span className="mx-2 text-sm font-medium">Dashboard</span>
              </Link>
            )}

            {(userRole === "admin" || dbUserRole === "admin") && (
              <div>
                <Link
                  href={"/allusers"}
                  onClick={() => handleSetActiveLink("/allusers")}
                  className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700 ${
                    activeLink === "/allusers"
                      ? "bg-gray-300 text-blue-500"
                      : "text-gray-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                    />
                  </svg>

                  <span className="mx-2 text-sm font-medium">Users</span>
                </Link>
                <Link
                  className={`flex items-center px-3 py-2 mt-2 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700 ${
                    activeLink === "/addservice"
                      ? "bg-gray-300 text-blue-500"
                      : "text-gray-600"
                  }`}
                  href={"/addservice"}
                  onClick={() => handleSetActiveLink("/addservice")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                    />
                  </svg>

                  <span className="mx-2 text-sm font-medium">
                    Services
                  </span>
                </Link>
                <Link
                  className={`flex items-center px-3 py-2 mt-2 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700 ${
                    activeLink === "/allservicetable"
                      ? "bg-gray-300 text-blue-500"
                      : "text-gray-600"
                  }`}
                  href={"/allservicetable"}
                  onClick={() => handleSetActiveLink("/allservicetable")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                    />
                  </svg>

                  <span className="mx-2 text-sm font-medium">
                    Create Service
                  </span>
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-3 ">
            {(userRole === "admin" || dbUserRole === "admin") && (
              <div>
                <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                  content
                </label>
                <Link
                  className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700 ${
                    activeLink === "/addcategory"
                      ? "bg-gray-300 text-blue-500"
                      : "text-gray-600"
                  }`}
                  href="/addcategory"
                  onClick={() => handleSetActiveLink("/addcategory")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>

                  <span className="mx-2 text-sm font-medium">
                    Create Category
                  </span>
                </Link>
                <Link
                  className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700 ${
                    activeLink === "/allbookings"
                      ? "bg-gray-300 text-blue-500"
                      : "text-gray-600"
                  }`}
                  href="/allbookings"
                  onClick={() => handleSetActiveLink("/allbookings")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                    />
                  </svg>

                  <span className="mx-2 text-sm font-medium">
                    Manage Bookings
                  </span>
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-3 ">
            <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
              My Dashboard
            </label>
            <Link
              className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700 ${
                activeLink === "/mycart"
                  ? "bg-gray-300 text-blue-500"
                  : "text-gray-600"
              }`}
              href={"/mycart"}
              onClick={() => handleSetActiveLink("/mycart")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                />
              </svg>

              <span className="mx-2 text-sm font-medium">My Cart</span>
            </Link>

            <Link
              className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700 ${
                activeLink === "/mybookings"
                  ? "bg-gray-300 text-blue-500"
                  : "text-gray-600"
              }`}
              href="/mybookings"
              onClick={() => handleSetActiveLink("/mybookings")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                />
              </svg>

              <span className="mx-2 text-sm font-medium">Bookings</span>
            </Link>
            {(userRole === "admin" || dbUserRole === "admin") && (
              <Link
                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-300  hover:text-gray-700"
                href="/createcontent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                  />
                </svg>

                <span className="mx-2 text-sm font-medium">Create Blog</span>
              </Link>
            )}
            {(userRole === "admin" || dbUserRole === "admin") && (
              <Link
                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-300  hover:text-gray-700"
                href="/allfeedbacks"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                  />
                </svg>

                <span className="mx-2 text-sm font-medium">Feedbacks</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
