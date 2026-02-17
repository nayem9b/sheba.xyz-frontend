"use client";
import { SignedOut, UserButton, SignedIn, useSession } from "@clerk/nextjs";
import { checkUserRole } from "../../utils/userUtils";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect } from "react";

const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { session } = useSession();
  const userRole = checkUserRole(session);

  return (
    <div className="">
      <header className="bg-white fixed top-0 w-full shadow-sm rounded-full z-40">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
              <Link href="/" title="" className="flex">
                <img
                  className="w-auto h-8"
                  src="https://s3.ap-south-1.amazonaws.com/cdn-shebaxyz/sheba_xyz/images/sheba_logo_blue.png"
                  alt=""
                  width={300}
                />
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
            >
              <svg
                className="block w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 8h16M4 16h16"
                ></path>
              </svg>

              <svg
                className="hidden w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <div className="ml-52">
              <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
                <Link
                  href="/"
                  title=""
                  className="text-base text-black transition-all duration-200 hover:text-opacity-80 no-underline"
                >
                  {" "}
                  Home
                </Link>

                <Link
                  href="/allcategories"
                  title=""
                  className="text-base text-black transition-all duration-200 hover:text-opacity-80 no-underline"
                >
                  {" "}
                  Categories
                </Link>
                <Link
                  href="/allservices"
                  title=""
                  className="text-base text-black transition-all duration-200 hover:text-opacity-80 no-underline"
                >
                  {" "}
                  Services
                </Link>

                <Link
                  href="/allcontents"
                  title=""
                  className="text-base text-black transition-all duration-200 hover:text-opacity-80 no-underline"
                >
                  {" "}
                  Blogs{" "}
                </Link>
                <Link
                  href="/#faq"
                  title=""
                  className="text-base text-black transition-all duration-200 hover:text-opacity-80 no-underline"
                >
                  {" "}
                  FAQ
                </Link>
              </div>
            </div>

            {user ? (
              <div className="flex gap-8">
                {userRole === "admin" && (
                  <Link
                    href="/admin"
                    title=""
                    className="text-base text-black transition-all duration-200 hover:text-opacity-80 no-underline"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  href="/mycart"
                  title=""
                  className="text-base text-black transition-all duration-200 hover:text-opacity-80 no-underline"
                >
                  My Cart
                </Link>
                <Link
                  href="/account"
                  title=""
                  className="text-base text-black transition-all duration-200 hover:text-opacity-80 no-underline"
                >
                  Profile
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <>
                <div className="flex gap-4">
                  <Link
                    href="sign-in"
                    className="px-5 py-3 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm no-underline"
                  >
                    sign in
                  </Link>
                  <Link
                    href="sign-up"
                    className="px-5 py-3 font-medium bg-green-200 hover:bg-green-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm no-underline"
                  >
                    New here?
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
