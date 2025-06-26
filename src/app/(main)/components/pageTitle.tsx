"use client";

import { usePathname } from "next/navigation";
import { routeMap } from "@/config/routes";
import { ReactNode } from "react";
import { Card } from "antd";

export default function PageTitle({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // console.log(pathname);
  return (
    <>
      <div className="text-2xl font-bold mb-4">{routeMap[pathname]}</div>
      {pathname === "/dashboard" ? children : <Card>{children}</Card>}
    </>
  );
}
