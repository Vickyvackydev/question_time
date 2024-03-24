"use client";
import { useToken } from "@/context/AuthToken";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LoginWithToken = () => {
  const { handleRetrieveToken, token, loading } = useToken();
  const [email, setEmail] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (token) {
      setEmail("");
      router.push("/quest-page");
    }
    // console.log(token);
  }, [token]);
  return (
    <div className="flex justify-center items-center my-[15rem]  flex-col gap-3">
      <span className="lg:text-3xl text-lg  font-semibold text-purple-500 shadow-md">
        Login with your email token
      </span>
      <input
        type="email"
        value={email}
        className="lg:w-[20vw] w-[70%] outline-none border-2 rounded-lg border-gray-400 shadow-md p-3 bg-transparent text-gray-300"
        placeholder="Your email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <button
        className="bg-green-500 rounded-lg px-3 py-2  text-white font-semibold hover:scale-75 transition-all duration-300 "
        onClick={() => handleRetrieveToken(email)}
      >
        {loading ? "please wait..." : "Continue"}
      </button>
      {/* {token && <span>Token : {token}</span>} */}
    </div>
  );
};

export default LoginWithToken;
