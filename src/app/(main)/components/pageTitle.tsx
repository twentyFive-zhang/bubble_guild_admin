"use client";

import { usePathname } from "next/navigation";
import { routeMap } from "@/config/routes";
import { ReactNode } from "react";
import { Breadcrumb, Card } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function PageTitle({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  console.log(routeMap[pathname]);
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={routeMap[pathname].map((item) => ({
          title: item.children?.length ? item.title : <Link href={item.href}>{item.title}</Link>,
        }))}></Breadcrumb>
      {["/dashboard", "/dataManage"].includes(pathname) ? children : <Card>{children}</Card>}
    </div>
  );
}
