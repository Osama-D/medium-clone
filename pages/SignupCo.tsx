import React, { useState, useContext, createContext } from "react";
import Link from "next/link";
import { useAppContext } from "../components/context";
import { auth } from "../components/firebase/firebase-config";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
const AppContext1 = createContext(null);

export function SignupCo() {
  const router = useRouter();
  const { user, signInWithPopup, setfullname, fullname } = useAppContext();
  const provider = new GoogleAuthProvider();

  function handlesubmit(e: any) {
    e.preventDefault();
    updateProfile(auth.currentUser, {
      displayName: fullname,
    });
    router.push("/");
  }

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <div className="flex justify-center items-center p-4">
        {" "}
        <Link passHref href="/">
          <img
            className="w-44 object-contain cursor-pointer"
            src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"
            alt=""
          />
        </Link>
      </div>
      <div className="font-poppins mt-20 space-y-4">
        <h1 className="text-4xl ">Amost there!</h1>
        <h2 className="text-lg text-gray-600">
          Finish creating your account for the full Medium experience.
        </h2>
      </div>
      <form onSubmit={handlesubmit} className="my-10 font-poppins">
        <div className=" flex flex-col justify-center items-center space-y-4">
          <label className="text-gray-700 " htmlFor="Name">
            Your full name
          </label>
          <input
            onChange={(e) => {
              setfullname(e.target.value);
            }}
            pattern="[a-zA-Z0-9 -_]{5,16}"
            className=" w-[20rem] md:w-[30rem] focus:none outline-none border-b-2 py-2 border-gray-400"
            type="text"
            placeholder="Full Name"
            required
            max={20}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <label className="text-gray-700 pt-10">Your email :</label>
          <h2 className="pb-4">{user && user.email}</h2>
          <button className="text-white hover:bg-green-700 duration-300 bg-green-600 px-4 w-fit m-auto rounded-full py-2">
            Create account
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupCo;
