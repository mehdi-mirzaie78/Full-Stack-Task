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
    <Link className="mr-1 font-semibold btn btn-ghost text-xl" href={href}>
      {children}
    </Link>
  );
};

const Navbar = () => {
  const { authQuery, resetAuthQuery } = useAuthQueryStore();

  return (
    // <div className="flex p-4 bg-slate-200 justify-between">
    //   <ul className="flex">
    //     <NavLink href="/">Next.js</NavLink>
    //     <NavLink href="/blogs">Blogs</NavLink>
    //     {!access && (
    //       <>
    //         <NavLink href="/auth/login">Login</NavLink>
    //         <NavLink href="/auth/register">Register</NavLink>
    //         <NavLink href="/admin">Admin</NavLink>
    //       </>
    //     )}
    //   </ul>
    //   <ul>
    //     {username && (
    //       // <li className="font-semibold text-lg bg-blue-500 text-blue-100 px-2 rounded-sm">
    //       //   {username}
    //       // </li>
    //       <div className="dropdown dropdown-end">
    //         <div
    //           tabIndex={0}
    //           role="button"
    //           className="btn btn-ghost btn-circle avatar"
    //         >
    //           <div className="w-10 rounded-full">
    //             <img
    //               alt="Tailwind CSS Navbar component"
    //               src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    //             />
    //           </div>
    //         </div>
    //         <ul
    //           tabIndex={0}
    //           className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
    //         >
    //           <li>
    //             <a className="justify-between">
    //               Profile
    //               <span className="badge">New</span>
    //             </a>
    //           </li>
    //           <li>
    //             <a>Settings</a>
    //           </li>
    //           <li>
    //             <a>Logout</a>
    //           </li>
    //         </ul>
    //       </div>
    //     )}
    //   </ul>
    // </div>

    <div className="navbar bg-base-200">
      <div className="flex-1">
        <NavLink href="/">Next.js</NavLink>
        <NavLink href="/blogs">Blogs</NavLink>
        {!authQuery?.access && (
          <>
            <NavLink href="/auth/login">Login</NavLink>
            <NavLink href="/auth/register">Register</NavLink>
            {/* <NavLink href="/admin">Admin</NavLink> */}
          </>
        )}
      </div>
      {authQuery?.access && authQuery?.refresh && (
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="text-md btn btn-primary avatar border-0"
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
