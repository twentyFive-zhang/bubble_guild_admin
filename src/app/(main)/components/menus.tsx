"use client";

import { Menu } from "antd";

import { menuList } from "@/config/routes";
import { usePathname, useRouter } from "next/navigation";

export default function Menus() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Menu
      defaultSelectedKeys={[pathname]}
      selectedKeys={[pathname]}
      mode="inline"
      items={menuList}
      onClick={(item) => {
        router.push(item.key);
      }}></Menu>
  );
}
