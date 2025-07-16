import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Avatar, Flex, Layout } from "antd";
import { useAtom } from "jotai/react";
import type { ReactNode } from "react";
import { userAtom } from "@/store";
import { UserAvatar } from "./-components/avatar";
import Menus from "./-components/menus";
import PageTitle from "./-components/pageTitle";

const { Header, Sider, Content } = Layout;

export const Route = createFileRoute("/_main")({
	component: RouteComponent,
});

function RouteComponent({ children }: { children?: ReactNode }) {
	const [data] = useAtom(userAtom);
	return (
		<Layout className="h-screen">
			<Header className="!bg-white">
				<Flex justify="space-between" align="center" className="h-full">
					<Flex align="center" gap={16}>
						<Avatar src={data.guildIcon} size="large"></Avatar>
						<div className="text-lg font-bold">工会后台</div>
					</Flex>
					<UserAvatar></UserAvatar>
				</Flex>
			</Header>
			<Layout hasSider>
				<Sider theme="light" className="h-full overflow-y-auto">
					<Menus></Menus>
				</Sider>
				<Content className="p-5 h-full overflow-y-auto">
					<PageTitle>{children ? children : <Outlet></Outlet>}</PageTitle>
				</Content>
			</Layout>
		</Layout>
	);
}
