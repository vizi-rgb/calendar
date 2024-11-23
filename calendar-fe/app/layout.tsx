import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import StoreProvider from "@/app/store-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import StoreInitializer from "@/app/store-initializer";
import ReactQueryProvider from "@/app/react-query-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clientId: string = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

  return (
    <html lang="pl" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <StoreInitializer>
              <ReactQueryProvider>
                <GoogleOAuthProvider clientId={clientId}>
                  {children}
                </GoogleOAuthProvider>
              </ReactQueryProvider>
            </StoreInitializer>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
