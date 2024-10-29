"use client";
import { Context } from "@/context";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:1337/auth/signout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch({ type: "LOGOUT" });
        router.push("/");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    } else {
      setUserId("");
    }
  }, [user]);

  return (
    <div className=" flex max-w-[1440px] w-full h-10 mx-auto items-center justify-between">
      <div className=" flex gap-4">
        <Link href="/">Home</Link>
      </div>
      <div className="flex gap-5 items-center">
        {userId === "" ? (
          <>
            <Link href="/login">login</Link>
            <Link href="/register">Register</Link>
          </>
        ) : (
          <>
            <Link href="/post-article">Post Article</Link>
            <Link href="/profile">Profile</Link>
            <div onClick={handleLogout} className=" cursor-pointer">
              Logout
            </div>
          </>
        )}
      </div>
    </div>
  );
}
