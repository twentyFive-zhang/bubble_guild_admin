"use client";

import { useLocation, useNavigate } from "@tanstack/react-router";
import { Menu } from "antd";
import { useEffect } from "react";
import { menuList, routeMap } from "@/config/routes";

export default function Menus() {
	const navigate = useNavigate();
	const pathname = useLocation({ select: (location) => location.pathname });

	useEffect(() => {
		const routeList = routeMap[pathname];
		if (!routeList?.length) {
			document.title = "工会管理后台";
		} else {
			document.title = routeList[routeList.length - 1].title;
		}
	}, [pathname]);
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
