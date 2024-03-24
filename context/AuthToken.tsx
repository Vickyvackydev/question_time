"use client";
import { createContext, useContext, useEffect } from "react";
import { useTokenManager } from "@/hooks/useTokenManager";
import { useRouter } from "next/navigation";

interface TokenContextType {
  token: string | null;
  handleRetrieveToken: (email: string) => void;
  loading: boolean;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token, handleRetrieveToken, loading } = useTokenManager();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login-token");
    }
  }, [token, router]);

  return (
    <TokenContext.Provider value={{ token, handleRetrieveToken, loading }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
