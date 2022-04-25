import React, { useEffect, useState, useContext, createContext } from "react";
const AppContext = createContext(null);
import { auth } from "../components/firebase/firebase-config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import { Post } from "../typing";
import { sanityClient } from "../sanity";
import firebase from "firebase/compat";

export function Context({ children }) {
  const router = useRouter();
  const [fullname, setfullname] = useState("");
  function createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signUpWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        router.push("/SignupCo");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        router.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [user, setuser] = useState({});

  useEffect(() => {
    const unsbscribe = onAuthStateChanged(auth, (current) => {
      setuser(current);
    });
    return () => {
      unsbscribe();
    };
  }, []);
  async function logout() {
    router.reload();
    await signOut(auth);
  }
  // sign up & sign in

  const [registeremail, setregisteremail] = useState("");
  const [registerpassword, setregisterpassword] = useState("");

  const [messageerr, setmessageerr] = useState(false);
  const [messageerr1, setmessageerr1] = useState(false);
  const [messageerr2, setmessageerr2] = useState(false);
  async function handlesubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    try {
      await createUser(registeremail, registerpassword);

      router.push("/SignupCo");
    } catch (error) {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/user-disabled" ||
        error.code === "auth/user-not-found"
      ) {
        setmessageerr(true);
        setmessageerr1(false);
        setmessageerr2(false);
      } else if (error.code === "auth/wrong-password") {
        setmessageerr1(false);
        setmessageerr(false);
        setmessageerr2(true);
      } else if (error.code === "auth/email-already-in-use") {
        setmessageerr1(true);
        setmessageerr2(false);
        setmessageerr(false);
      } else if (error.code === "auth/weak-password") {
        setmessageerr1(false);
        setmessageerr(false);
        setmessageerr2(true);
      } else {
        setmessageerr(true);
        console.log(error.message);
      }
    }
  }
  const [loginemail, setloginemail] = useState("");
  const [loginpassword, setloginpassword] = useState("");
  const [successlogin, setsuccesslogin] = useState(false);
  async function login(e: any) {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginemail,
        loginpassword
      );
      setsuccesslogin(true);

      router.reload();
    } catch (error) {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/user-disabled" ||
        error.code === "auth/user-not-found"
      ) {
        setmessageerr(true);
        setmessageerr1(false);
        setmessageerr2(false);
      } else if (error.code === "auth/wrong-password") {
        setmessageerr1(false);
        setmessageerr(false);
        setmessageerr2(true);
      } else if (error.code === "auth/weak-password") {
        setmessageerr1(false);
        setmessageerr(false);
        setmessageerr2(true);
      } else {
        setmessageerr(true);
        setmessageerr2(false);
        setmessageerr1(false);
        console.log(error.message);
      }
    }
  }

  return (
    <AppContext.Provider
      value={{
        createUser,

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
