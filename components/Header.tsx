import React, { useState, createContext } from "react";
import Link from "next/link";
import { VscClose } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import { useAppContext } from "../components/context";
import { BsChevronLeft } from "react-icons/bs";
import { BiErrorAlt } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../components/firebase/firebase-config";

const AppContext = createContext(null);

export function Header() {
  const [signup, setsignup] = useState(false);
  const {
    user,
    signInWithGoogle,
    signUpWithGoogle,
    logout,
    setfullname,
    fullname,
    // sign in & sign up
    handlesubmit,
    login,
    registeremail,
    setregisteremail,
    registerpassword,
    setregisterpassword,
    messageerr,
    setmessageerr,
    messageerr1,
    setmessageerr1,
    messageerr2,
    setmessageerr2,
    loginemail,
    setloginemail,
    loginpassword,
    setloginpassword,
    successlogin,
    setsuccesslogin,
    // sign in & sign up
  } = useAppContext();
  const [sign, setsign] = useState(0);
  const [usersetting, setusersetting] = useState(false);

  const displayName = user && user.displayName;
  const [followed, setfollowed] = useState(false);

  function Clickedfollow() {
    const usermail = { userEmail: user?.email };

    if (user) {
      addDoc(collection(db, "Followed"), usermail)
        .then(() => {
          setfollowed((prev) => !prev);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      setsignup(true);
    }
  }
  return (
    <div className="bg-white fixed inset-x-0 top-0 shadow-lg  z-10">
      <header className="flex   justify-between font-poppins items-center p-3 sm:p-5 wrapper">
        <div className="flex items-center space-x-0 sm:space-x-5">
          <Link passHref href="/">
            <img
              src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"
              alt=""
              className="h-10 hidden sm:block cursor-pointer"
            />
          </Link>
          <Link passHref href="/">
            <img
              src="https://cdn3.iconfinder.com/data/icons/social-media-black-white-2/1151/Medium_logo_-_black-512.png"
              alt=""
              className="h-14 sm:hidden cursor-pointer"
            />
          </Link>
          <div className="hidden md:inline-flex items-center space-x-5">
            <h3 className="cursor-pointer">About</h3>
            <h3 className="cursor-pointer">Contact</h3>
            <h3
              onClick={Clickedfollow}
              className={`${
                followed
                  ? "border-[1px] cursor-pointer rounded-full border-green-600 hover:border-green-800 duration-500  px-6 py-2 text-gray-900"
                  : "bg-green-600 cursor-pointer rounded-full hover:bg-green-700 duration-500  px-4 py-2 text-white"
              }`}
            >
              {followed ? "Following" : "Follow"}
            </h3>
          </div>
        </div>
        <div className="flex   items-center  space-x-5 text-green-600 ">
          {user && (
            <div className="relative">
              <div
                onClick={() => setusersetting(!usersetting)}
                className="w-10 h-10 cursor-pointer  rounded-full"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} className="rounded-full" alt="" />
                ) : (
                  <div className="bg-green-600  cursor-pointer flex justify-center items-center rounded-full h-10 w-10">
                    <span className="text-white cursor-pointer uppercase">
                      {displayName?.slice(0, 2)}
                    </span>
                  </div>
                )}
              </div>
              <div
                onClick={() => setusersetting(false)}
                className={usersetting ? " fixed  inset-0 z-30" : ""}
              ></div>
              <div
                className={`${
                  usersetting
                    ? "bg-gray-200 z-50 translate-x-[0%] opacity-100 duration-300 ease-in-out  w-[20rem] sm:w-[25rem] px-10 py-8 rounded-lg shadow-lg absolute top-20 right-0  "
                    : "bg-gray-200 z-50  translate-x-[200%] opacity-0 duration-300 ease-in-out   w-[20rem] sm:w-[25rem] px-10 py-8 rounded-lg shadow-lg absolute top-20 right-0  "
                }`}
              >
                <h2
                  onClick={logout}
                  className="text-gray-800 hover:text-black duration-75 text-md cursor-pointer"
                >
                  Sign out
                </h2>
                <div className="my-4 border-b-2 border-gray-400" />
                <div className="flex justify-start space-x-4  items-center">
                  {user?.photoURL ? (
                    <img
                      className="w-10 h-10 rounded-full "
                      src={user?.photoURL}
                      alt=""
                    />
                  ) : (
                    <div className="bg-green-600 cursor-pointer flex justify-center items-center rounded-full h-10 w-10">
                      <span className="text-white uppercase">
                        {user.displayName?.slice(0, 2)}
                      </span>
                    </div>
                  )}
                  <div className="">
                    <h2 className="text-gray-900 text-sm capitalize">
                      {user && displayName}
                    </h2>
                    <h3 className="text-gray-600 text-sm ">
                      @{user && user.email?.split("@")[0]}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!user && (
            <div className="flex justify-center items-center space-x-5">
              <h3
                className="cursor-pointer"
                onClick={() => {
                  setsignup(true);
                  setsign(1);
                }}
              >
                Sign In
              </h3>
              <h3
                onClick={() => setsignup(true)}
                className="border px-4 py-1 cursor-pointer hover:bg-green-600 hover:text-white duration-200 rounded-full border-green-600"
              >
                Get Started
              </h3>
            </div>
          )}
        </div>
      </header>
      {/* SIGN UP */}
      {(() => {
        if (sign === 0) {
          return (
            <div className="text-center">
              <div
                onClick={() => {
                  setsignup(false);
                  setsign(0);
                }}
                className={`${
                  signup
                    ? "fixed inset-0 bg-gray-100   backdrop-blur-md duration-500  bg-opacity-60 ease-in-out transition-all  overflow-y-hidden flex justify-center items-center "
                    : "fixed inset-0 backdrop-blur-0 pointer-events-none duration-500  bg-opacity-0  ease-in-out transition-all overflow-y-hidden   "
                }`}
              />
              <div
                className={`${
                  signup
                    ? "scale-100  z-[100] md:z-10 ease-in-out duration-500 min-h-full md:min-h-[600px] w-full md:w-auto md:h-auto md:m-auto  rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                    : "scale-0  ease-in-out duration-500 h-[600px] w-[500px]   rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                }`}
              >
                {signup && (
                  <div className="w-full  md:mx-[20rem] my-[10rem]">
                    <div
                      className="p-4  cursor-pointer  z-50  absolute top-0 pt-10 pr-10 right-0"
                      onClick={() => setsignup(false)}
                    >
                      <VscClose className="h-8 w-8  text-gray-400 hover:text-gray-700 duration-100 text-2xl cursor-pointer" />
                    </div>
                    <div className="px-10  md:-translate-0 absolute w-full m-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <div className="">
                        <div className="capitalize flex-col font-poppins text-2xl  flex justify-center my-10">
                          <h1 className="py-10">Join Medium.</h1>
                          <h2 className="text-sm max-w-[24rem] m-auto">
                            Create an account to receive great stories in your
                            inbox, personalize your homepage, and follow authors
                            and topics that you love.
                          </h2>
                        </div>
                        <div>
                          <div
                            onClick={signUpWithGoogle}
                            className="flex w-fit m-auto  items-center justify-center space-x-4 border-[1px] mb-[13px] px-4 py-2 cursor-pointer  border-gray-600 hover:border-gray-900 rounded-full font-poppins text-sm text-gray-800"
                          >
                            <FcGoogle className="h-[19px] w-[19px]" />
                            <h2>Sign up with Google</h2>
                          </div>
                          <div
                            onClick={() => {
                              setsign(2);
                            }}
                            className="flex w-fit m-auto  items-center justify-center space-x-4 border-[1px] mb-10 px-[21px] py-2 cursor-pointer  border-gray-600 hover:border-gray-900 rounded-full font-poppins text-sm text-gray-800"
                          >
                            <IoMailOutline className="h-[19px] w-[19px] text-black" />
                            <h2>Sign up with Email </h2>
                          </div>
                        </div>
                        <div className="font-poppins mb-16 text-sm flex justify-center">
                          Already have an account? {"  "}
                          <span
                            onClick={() => setsign(1)}
                            className="text-green-600 cursor-pointer font-bold ml-2"
                          >
                            {" "}
                            Sign in
                          </span>
                        </div>
                        <div className="font-poppins  mb-20   text-center text-gray-600 text-xs flex justify-center items-center">
                          <h2>
                            Click “Sign Up” to agree to Medium’s Terms of
                            Service and acknowledge that Medium’s Privacy Policy
                            applies to you.
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        } else if (sign === 1) {
          return (
            <div className="text-center ">
              <div
                onClick={() => {
                  setsignup(false);
                  setsign(0);
                }}
                className={`${
                  signup
                    ? "fixed inset-0 bg-gray-100  backdrop-blur-md duration-500  bg-opacity-60 ease-in-out transition-all  overflow-y-hidden flex justify-center items-center "
                    : "fixed inset-0 backdrop-blur-0 pointer-events-none duration-500  bg-opacity-0  ease-in-out transition-all overflow-y-hidden   "
                }`}
              />
              <div
                className={`${
                  signup
                    ? "scale-100 z-[100] md:z-10  ease-in-out duration-500 min-h-full md:min-h-[600px] w-full md:w-auto md:h-auto md:m-auto   rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                    : "scale-0  ease-in-out duration-500 h-[600px] w-[500px]   rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                }`}
              >
                {signup && (
                  <div className="w-full md:px-[20rem] py-[10rem]">
                    <div
                      className="p-4 z-50 cursor-pointer absolute top-0 pt-10 pr-10 right-0"
                      onClick={() => setsignup(false)}
                    >
                      <VscClose className="h-8 w-8 text-gray-400 hover:text-gray-700 duration-100 text-2xl cursor-pointer" />
                    </div>
                    <div className="px-10  md:-translate-0 absolute w-full m-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <div className="">
                        <div className="capitalize  font-poppins text-2xl  flex justify-center py-10">
                          <h1>Welcome back.</h1>
                        </div>
                        <div>
                          <div
                            onClick={signInWithGoogle}
                            className="flex w-fit m-auto  items-center justify-center space-x-4 border-[1px] mb-[13px] px-4 py-2 cursor-pointer  border-gray-600 hover:border-gray-900 rounded-full font-poppins text-sm text-gray-800"
                          >
                            <FcGoogle />
                            <h2>Sign in with Google</h2>
                          </div>
                          <div
                            onClick={() => {
                              setsign(3);
                            }}
                            className="flex w-fit m-auto  items-center justify-center space-x-4 border-[1px] mb-10 px-[21px] py-2 cursor-pointer  border-gray-600 hover:border-gray-900 rounded-full font-poppins text-sm text-gray-800"
                          >
                            <IoMailOutline className="h-[19px] w-[19px] text-black" />
                            <h2>Sign in with Email </h2>
                          </div>
                        </div>
                        <div className="font-poppins mb-16 text-sm flex justify-center">
                          No account?
                          <span
                            onClick={() => setsign(0)}
                            className="text-green-600 cursor-pointer font-bold ml-2"
                          >
                            {" "}
                            Create one
                          </span>
                        </div>
                        <div className="font-poppins  mb-20   text-center text-gray-600 text-xs flex justify-center items-center">
                          <h2>
                            Click “Sign In” to agree to Medium’s Terms of
                            Service and acknowledge that Medium’s Privacy Policy
                            applies to you.
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        } else if (sign === 2) {
          return (
            <div className="text-center ">
              <div
                onClick={() => {
                  setsignup(false);
                  setsign(0);
                }}
                className={`${
                  signup
                    ? "fixed inset-0 bg-gray-100  backdrop-blur-md duration-500  bg-opacity-60 ease-in-out transition-all  overflow-y-hidden flex justify-center items-center "
                    : "fixed inset-0 backdrop-blur-0 pointer-events-none duration-500  bg-opacity-0  ease-in-out transition-all overflow-y-hidden   "
                }`}
              />
              <div
                className={`${
                  signup
                    ? "scale-100 z-[100] md:z-10  ease-in-out duration-500 min-h-full md:min-h-[600px] w-full md:w-auto md:h-auto md:m-auto   rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                    : "scale-0  ease-in-out duration-500 h-[600px] w-[500px]   rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                }`}
              >
                {signup && (
                  <div className="w-full md:px-[20rem] py-[10rem]">
                    <div
                      className="p-4 cursor-pointer absolute top-0 pt-10 pr-10 right-0"
                      onClick={() => setsignup(false)}
                    >
                      <VscClose className="h-8 w-8 text-gray-400 hover:text-gray-700 duration-100 text-2xl cursor-pointer" />
                    </div>
                    <div className="px-10  md:-translate-0 absolute w-full m-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <div className="">
                        <div className="capitalize flex flex-col  font-poppins text-2xl  space-y-2 justify-center py-10">
                          <h1>Sign up with email</h1>
                          <h2 className="capitalize  font-poppins text-sm  ">
                            Enter your email address to create an account.
                          </h2>
                        </div>
                        <form
                          onSubmit={handlesubmit}
                          className="flex flex-col w-[90%] sm:w-[60%]  mb-10 mt-6 m-auto "
                        >
                          <label
                            className="text-gray-900 text-sm"
                            htmlFor="email"
                          >
                            Your Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            onChange={(e) => {
                              setregisteremail(e.target.value);
                            }}
                            className="w-full md:w-[80%] m-auto text-center focus:none outline-none border-b-[0.2px] py-[4px] border-gray-900/50 hover:border-gray-700 duration-100 focus:border-black"
                            type="text"
                            required
                            max={20}
                          />
                          <label
                            className="text-gray-900 text-sm mt-4"
                            htmlFor="password"
                          >
                            Your password
                          </label>
                          <input
                            onChange={(e) => {
                              setregisterpassword(e.target.value);
                            }}
                            name="password"
                            id="password"
                            type="password"
                            className="w-full my-2 md:w-[80%] m-auto text-center focus:none outline-none border-b-[0.2px] py-[4px] border-gray-900/50 hover:border-gray-700 duration-100 focus:border-black"
                            required
                            max={20}
                          />
                          <input
                            className="px-8 mt-4 w-[70%] m-auto py-2 bg-gray-900 cursor-pointer hover:bg-black duration-100 rounded-full text-white"
                            type="submit"
                            value={successlogin ? "Successed" : "Continue"}
                          />
                          {messageerr && (
                            <div className="mt-4 flex justify-start space-x-[8px] items-center">
                              <BiErrorAlt className="text-red-500 h-6" />
                              <h2 className="text-red-500">
                                Invalid mail or password
                              </h2>
                            </div>
                          )}
                          {messageerr1 && (
                            <div className="mt-4 flex justify-start space-x-[8px] items-center">
                              <BiErrorAlt className="text-red-500 h-6" />
                              <h2 className="text-red-500">
                                Email already in use
                              </h2>
                            </div>
                          )}
                          {messageerr2 && (
                            <div className="mt-4 flex justify-start space-x-[8px] items-center">
                              <BiErrorAlt className="text-red-500 h-6" />
                              <h2 className="text-red-500">Weak Password</h2>
                            </div>
                          )}
                        </form>

                        <div
                          onClick={() => setsign(0)}
                          className="font-poppins items-center  mb-16 text-sm flex justify-center"
                        >
                          <BsChevronLeft className="text-green-600 h-4 w-4" />
                          <span className="text-green-600 cursor-pointer  ml-2">
                            {" "}
                            All sign up options
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        } else if (sign === 3) {
          return (
            <div className="text-center ">
              <div
                onClick={() => {
                  setsignup(false);
                  setsign(0);
                }}
                className={`${
                  signup
                    ? "fixed inset-0 bg-gray-100  backdrop-blur-md duration-500  bg-opacity-60 ease-in-out transition-all  overflow-y-hidden flex justify-center items-center "
                    : "fixed inset-0 backdrop-blur-0 pointer-events-none duration-500  bg-opacity-0  ease-in-out transition-all overflow-y-hidden   "
                }`}
              />
              <div
                className={`${
                  signup
                    ? "scale-100 z-[100] md:z-10  ease-in-out duration-500 min-h-full md:min-h-[600px] w-full md:w-auto md:h-auto md:m-auto   rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                    : "scale-0  ease-in-out duration-500 h-[600px] w-[500px]   rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                }`}
              >
                {signup && (
                  <div className="w-full md:px-[20rem] py-[10rem]">
                    <div
                      className="p-4 cursor-pointer absolute z-50 top-0 pt-10 pr-10 right-0"
                      onClick={() => setsignup(false)}
                    >
                      <VscClose className="h-8 w-8 text-gray-400 hover:text-gray-700 duration-100 text-2xl cursor-pointer" />
                    </div>
                    <div className="px-10 mt-6   md:-translate-0 absolute w-full m-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <div className="">
                        <div className="capitalize flex flex-col  font-poppins text-2xl  space-y-2 justify-center py-10">
                          <h1>Sign in with email</h1>
                          <h2 className="capitalize px-12 font-poppins text-sm  ">
                            Enter the email address & password associated with
                            your account, and we’ll send you right to home page.
                          </h2>
                        </div>
                        <form
                          onSubmit={login}
                          className="flex flex-col w-[90%] sm:w-[60%]  mb-10 mt-2 m-auto "
                        >
                          <label
                            className="text-gray-900 text-sm"
                            htmlFor="email"
                          >
                            Your Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            onChange={(e) => {
                              setloginemail(e.target.value);
                            }}
                            className="w-full md:w-[80%] m-auto text-center focus:none outline-none border-b-[0.2px] py-[4px] border-gray-900/50 hover:border-gray-700 duration-100 focus:border-black"
                            type="text"
                            required
                            max={20}
                          />
                          <label
                            className="text-gray-900 text-sm mt-4"
                            htmlFor="password"
                          >
                            Your password
                          </label>
                          <input
                            onChange={(e) => {
                              setloginpassword(e.target.value);
                            }}
                            name="password"
                            id="password"
                            type="password"
                            className="w-full my-2 md:w-[80%] m-auto text-center focus:none outline-none border-b-[0.2px] py-[4px] border-gray-900/50 hover:border-gray-700 duration-100 focus:border-black"
                            required
                            max={20}
                          />
                          <input
                            className="px-8 mt-8 w-[70%] m-auto py-2 bg-gray-900 cursor-pointer hover:bg-black duration-100 rounded-full text-white"
                            type="submit"
                            value="Continue"
                          />
                          {messageerr && (
                            <div className="mt-4 flex justify-start space-x-[8px] items-center">
                              <BiErrorAlt className="text-red-500 h-6" />
                              <h2 className="text-red-500">
                                Invalid mail or password
                              </h2>
                            </div>
                          )}
                          {messageerr1 && (
                            <div className="mt-4 flex justify-start space-x-[8px] items-center">
                              <BiErrorAlt className="text-red-500 h-6" />
                              <h2 className="text-red-500">
                                Email already in use
                              </h2>
                            </div>
                          )}
                          {messageerr2 && (
                            <div className="mt-4 flex justify-start space-x-[8px] items-center">
                              <BiErrorAlt className="text-red-500 h-6" />
                              <h2 className="text-red-500">Weak Password</h2>
                            </div>
                          )}
                        </form>

                        <div
                          onClick={() => setsign(0)}
                          className="font-poppins items-center  mb-16 text-sm flex justify-center"
                        >
                          <BsChevronLeft className="text-green-600 h-4 w-4" />
                          <span className="text-green-600 cursor-pointer  ml-2">
                            {" "}
                            All sign up options
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        }
      })()}
      {/* SIGN UP */}
    </div>
  );
}

export default Header;
