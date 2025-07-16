"use client";

import { useLocation, useNavigate } from "@tanstack/react-router";
import { Menu } from "antd";
import { menuList, routeMap } from "@/config/routes";

export default function Menus() {
	const navigate = useNavigate();
	const pathname = useLocation({ select: (location) => location.pathname });
	console.log(pathname);
	// if(pathname==='')
	return (
		<Menu
			defaultSelectedKeys={[pathname]}
			defaultOpenKeys={[routeMap[pathname]?.[0].href]}
			selectedKeys={[pathname]}
			mode="inline"
			items={menuList}
			onClick={(item) => {
				// router.push(item.key);
				navigate({ to: item.key });
			}}
		></Menu>
	);
}
