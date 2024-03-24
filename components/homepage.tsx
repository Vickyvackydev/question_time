"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Homepage = () => {
  // const router = useRouter();
  return (
    <motion.div
      initial={{ rotate: 0, scale: 2 }}
      animate={{ rotate: 360, scale: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="flex justify-center items-center my-[15rem]  flex-col gap-3"
    >
      <span className="lg:text-4xl texy-xl font-semibold text-purple-500">
        Hi there 👋, Welcome to QuestionT.(Qt)
      </span>
      <span className="text-xl font-medium text-pink-500">
        Let's get you started
      </span>
      <Link href={"/login-token"}>
        <button className="bg-green-500 rounded-lg px-3 py-2  text-white font-semibold hover:scale-75 transition-all duration-300 ">
          Continue
        </button>
      </Link>
    </motion.div>
  );
};

export default Homepage;
