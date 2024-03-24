import axios from "axios";
import { useEffect, useState } from "react";

export const useTokenManager = () => {
  const [token, setToken] = useState<string | null>(() => {
    // Initialize token from localStorage if it exists
    if (typeof window !== "undefined") {
      // Initialize token from localStorage if it exists
      const storedToken = localStorage.getItem("token");
      return storedToken ? storedToken : null;
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Store token in localStorage when it changes
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    }
  }, [token]);
  const [loading, setLoading] = useState(false);

  const handleRetrieveToken = async (email: string) => {
    setLoading(true);
    try {
      const response = await axios.post("https://qt.organogram.app/token", {
        email,
      });
      const { token } = response.data;
      console.log(token);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }

      setToken(token);
    } catch (error) {
      console.log("error posting token", error);
    } finally {
      setLoading(false);
    }
  };

  return { token, handleRetrieveToken, loading };
};
