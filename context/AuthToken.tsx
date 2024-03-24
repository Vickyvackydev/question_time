"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface TokenTypes {
  token: string;
  handleRetrieveToken: (value: string) => void;
  loading: boolean;
}
const AuthToken = createContext<TokenTypes>({
  token: "",
  handleRetrieveToken: () => {},
  loading: true,
});

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const [token, setToken] = useState<string>(() => {
  //   // Initialize token from local storage or an empty string
  //   if (typeof window !== "undefined") {
  //     return localStorage.getItem("token") || "";
  //   } else {
  //     return "";
  //   }
  // });
  const [token, setToken] = useState("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRetrieveToken = async (email: string) => {
    setLoading(true);
    try {
      const response = await axios.post("https://qt.organogram.app/token", {
        email,
      });
      const { token } = response.data;
      console.log(token);
      // if (typeof window !== "undefined") {
      //   localStorage.setItem("token", token);
      // }

      setToken(token);
    } catch (error) {
      console.log("error posting token", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/login-token");
    }
  }, [token, router]);

  return (
    <AuthToken.Provider value={{ token, handleRetrieveToken, loading }}>
      {children}
    </AuthToken.Provider>
  );
};

export const useToken = (): TokenTypes => useContext(AuthToken);
