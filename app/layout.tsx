import "./globals.css";
import type { Metadata } from "next";
import { ReduxProvider } from "./redux/provider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Toaster
            toastOptions={{
              className: "",
              style: {
                fontSize: 16,
              },
            }}
            position="top-right"
          />

          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}