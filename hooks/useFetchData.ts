"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "@/context/AuthToken";

export const useFetchData = () => {
  const { token } = useToken();
  const [data, setData] = useState<any>({});

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("https://qt.organogram.app/questions", {
        headers: {
          token: token,
        },
      });

      const { data } = response;
      setData(data);
      console.log("questions fetched");
    } catch (error) {
      console.log("could not fetch questions", error);
    }
  };

  const updateQuestionData = (updatedData: any) => {
    setData(updatedData);
  };

  useEffect(() => {
    if (token) {
      fetchQuestions();
    } else {
      console.log("no token");
    }
  }, [token]);

  return { data, updateQuestionData };
};
