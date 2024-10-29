"use client";
import Base from "@/components/layout/base";
import { Context } from "@/context";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";
import toast from "react-hot-toast";

export default function Register() {
  const [userData, setUserData] = React.useState<any>({
    email: "",
    username: "",
    password: "",
  });

  const router = useRouter();
  const { dispatch } = React.useContext(Context);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        "http://localhost:1337/auth/signup",
        userData,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch({ type: "LOGIN", payload: res.data.data });
        toast.success(res.data.message);
        router.push("/");
        setUserData({ email: "", password: "", username: "" });
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  return (
    <Base>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[500px] h-fit border rounded-md">
          <div className="flex justify-center items-center h-20 bg-gray-900 rounded-t-md">
            <h1 className="text-2xl">Login</h1>
          </div>
          <form onSubmit={handleSubmit} className="p-5">
            {["username", "email", "password"].map((input, index) => (
              <div key={index} className="mb-4">
                <label className="block text-gray-400 text-lg font-bold mb-2 capitalize">
                  {input}
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                  id={input}
                  onChange={(e) => {
                    setUserData({ ...userData, [input]: e.target.value });
                  }}
                  type={
                    input === "email" || input === "username"
                      ? "text"
                      : "password"
                  }
                  placeholder={input}
                  value={userData[input]}
                />
              </div>
            ))}

            <div className="w-full flex items-center justify-center pt-3">
              <button
                className=" bg-blue-900 w-full h-10 rounded-md hover:bg-blue-500"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>

          <p className=" text-lg text-center pb-5">
            <span>Been here?..</span>
            <Link href="/login">Login now</Link>
          </p>
        </div>
      </div>
    </Base>
  );
}
