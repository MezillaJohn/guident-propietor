import DashBoardLayout from "./components/DashBoardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "guident dashboard",
  description: "Propietor's dashbord",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // return <div>{children}</div>;
  return <DashBoardLayout>{children}</DashBoardLayout>;
}
