import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Topbar from "@/components/topbar/topbar";
import SideMenu from "@/components/topbar/side-menu";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <div className="px-5">
            <Topbar />
            <div className="flex flex-row py-2 gap-x-2">
              <SideMenu setIsOpen={true} />
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
