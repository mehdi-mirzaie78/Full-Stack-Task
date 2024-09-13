"use client";

import Link from "next/link";
import { ReactNode } from "react";
import useAuthQueryStore from "./store/authStore";

interface NavLinkProps {
  children: ReactNode;
  href: string;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link
      className="mr-1 font-semibold btn btn-ghost text-md lg:text-xl"
      href={href}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const { authQuery, resetAuthQuery } = useAuthQueryStore();

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <NavLink href="/blogs">Blogs</NavLink>
        {!authQuery?.access && (
          <>
            <NavLink href="/auth/login">Login</NavLink>
            <NavLink href="/auth/register">Register</NavLink>
          </>
        )}
      </div>
      {authQuery?.access && authQuery?.refresh && (
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="text-xs md:text-md btn btn-primary avatar border-0 btn-sm md:btn-md"
            >
              {authQuery?.username?.toUpperCase()}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <span onClick={() => resetAuthQuery()}>Logout</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
