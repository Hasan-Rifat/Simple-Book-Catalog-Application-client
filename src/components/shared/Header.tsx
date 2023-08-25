import React, { useState } from "react";
import { CgChevronDownO } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logOut } from "../../app/features/user/userSlice";
import { AiOutlineHeart, AiFillRead } from "react-icons/ai";
import { toast } from "react-hot-toast";

const Header: React.FC = () => {
  const { data } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [mobile, SetMobile] = useState<boolean>(false);
  const [color, setColor] = useState<boolean>(false);
  const [dashboard, setDashboard] = useState<boolean>(false);

  const logout = () => {
    toast.success("Logout Successfully", {
      id: "logout",
    });
    dispatch(logOut());
  };

  // menu
  const menu: JSX.Element = (
    <>
      <li className="mr-[10px] p-[10px] text-primary">
        <Link to={"/"}>Home </Link>
      </li>
      <li className="mr-[10px] p-[10px] text-primary">
        <Link to={"/all-book"}>All Book</Link>
      </li>

      {data ? (
        <div className="flex items-center justify-center">
          <li className="mr-[10px] p-[10px] text-primary">
            <Link className="text-[#fb6f84] " to={"/wish-list"}>
              <AiOutlineHeart size={25} className="font-bold" />
            </Link>
          </li>
          <li className="mr-[10px] p-[10px] text-primary">
            <Link className="text-[#0ca6e8] " to={"/reading-list"}>
              <AiFillRead size={25} className="font-bold" />
            </Link>
          </li>
          <div className="relative flex justify-center items-center ">
            <div
              onClick={() => setDashboard(!dashboard)}
              className="cursor-pointer flex gap-2 items-center  online "
            >
              {data && (
                <div className=" rounded-full  text-red-600 bg-primary">
                  <h2 className="font-bold text-[18px] text-center px-[15px]">
                    {data.firstName} {data.lastName}
                  </h2>
                </div>
              )}
              <CgChevronDownO className="cursor-pointer " />
            </div>

            <div className={`${dashboard ? "block" : "hidden"} `}>
              <button
                className="mt-[10px] rounded-full  text-white bg-primary cursor-pointer flex flex-col mr-[10px] px-[20px] py-1 shadow-2xl  absolute top-[110%] right-0 "
                onClick={logout}
              >
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <li className="mr-[10px] p-[10px] text-primary">
            <Link to={"/login"}>Login</Link>
          </li>
          <li className="mr-[10px] p-[10px] text-primary">
            <Link to={"/register"}>Register</Link>
          </li>
        </>
      )}
    </>
  );

  const changeBg = () => {
    if (window.scrollY >= 70) {
      return setColor(true);
    } else {
      return setColor(false);
    }
  };
  window.addEventListener("scroll", changeBg);

  return (
    <header
      className={`xss:p-[20px] sm:p-[0px] z-50   ${
        color
          ? "bg-white shadow-[0px_4px_80px_rgba(0,0,0,0.1)] fixed left-0 right-0 top-0"
          : "bg-transparent  absolute left-0 right-0 top-0 "
      }`}
    >
      <div className="max-w-[1200px] mx-auto bg-transparent">
        <div>
          <div className="sm:p-[10px] lg:p-[20px] grid grid-cols-4">
            <div className="col-span-1 relative">
              <Link to={"/"}>
                <span className="font-bold text-2xl">eBook</span>
              </Link>
            </div>
            {/* mobile responsive start */}
            <div
              className="xss:col-span-3 md:hidden flex justify-end transition"
              onClick={() => SetMobile(!mobile)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>

            <div className="xss:hidden md:block md:col-span-3 ">
              <ul
                onClick={() => SetMobile(!mobile)}
                className={` md:flex justify-end  ${
                  mobile ? "block" : "hidden"
                }`}
              >
                {menu}
              </ul>
            </div>
          </div>
          {/* mobile responsive code  */}
          <div className="xss:w-full xss:absolute xss:left-0 xss:top-[67px]  md:hidden ">
            <ul
              onClick={() => SetMobile(!mobile)}
              className={`xss:p-[20px]  xss:bg-white  md:bg-transparent ${
                mobile ? "block" : "hidden"
              }`}
            >
              {menu}
            </ul>
          </div>
          {/* mobile responsive code  */}
        </div>
      </div>
    </header>
  );
};
export default Header;
