"use client";

import { Menu } from "antd";

import { menuList } from "@/config/routes";
import { usePathname, useRouter } from "next/navigation";
import { routeMap } from "@/config/routes";

export default function Menus() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Menu
      defaultSelectedKeys={[pathname]}
      defaultOpenKeys={[routeMap[pathname][0].href]}
      selectedKeys={[pathname]}
      mode="inline"
      items={menuList}
      onClick={(item) => {
        router.push(item.key);
      }}></Menu>
  );
}
