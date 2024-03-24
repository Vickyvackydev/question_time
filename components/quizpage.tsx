"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Quizpage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 360, scale: 1 }}
      transition={{ duration: 1 }}
      className="flex justify-center items-center my-[15rem]  flex-col gap-3 w-full h-full"
    >
      <span className="lg:text-6xl text-xl font-semibold text-purple-500">
        Get Your Questions Ready 🎉
      </span>
      <span className="lg:text-2xl text-xl font-medium text-pink-400">
        Let's get you started
      </span>
      <Link href="/question-quiz">
        <button className="bg-green-500 rounded-lg px-3 py-2  text-white font-semibold hover:scale-75 transition-all duration-300 lg:text-2xl text-xl">
          Start
        </button>
      </Link>
    </motion.div>
  );
};

export default Quizpage;
