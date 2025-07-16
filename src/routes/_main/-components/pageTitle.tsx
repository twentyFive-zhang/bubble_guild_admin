"use client";

import { useLocation } from "@tanstack/react-router";
import { Breadcrumb, Card } from "antd";
import type { ReactNode } from "react";
import { routeMap } from "@/config/routes";

export default function PageTitle({ children }: { children: ReactNode }) {
	const pathname = useLocation({ select: (location) => location.pathname });
	// console.log(routeMap[pathname]);
	return (
		<div className="flex flex-col gap-4">
			<Breadcrumb
				items={routeMap[pathname]?.map((item) => ({
					title: item.title,
				}))}
			></Breadcrumb>
			{["/dashboard", "/dataManage"].includes(pathname) ? (
				children
			) : (
				<Card>{children}</Card>
			)}
		</div>
	);
}
