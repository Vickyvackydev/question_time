import { TokenProvider } from "@/context/AuthToken";
import "./globals.css";
// import AuthGaurd from "@/context/AuthGuard";
export const metadata = {
  title: "Question Time",
  description: "webpage for asking questions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <AuthGaurd> */}
        <TokenProvider>{children}</TokenProvider>
        {/* </AuthGaurd> */}
      </body>
    </html>
  );
}
