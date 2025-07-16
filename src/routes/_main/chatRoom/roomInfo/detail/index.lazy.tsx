import { createLazyFileRoute } from "@tanstack/react-router";
import { Divider, Spin, Tabs } from "antd";
import { lazy, Suspense } from "react";
// import History from "./-components/History";
import Info from "./-components/Info";
import Log from "./-components/Log";
import Month from "./-components/Month";
import Rank from "./-components/Rank";
import Week from "./-components/Week";

const HistoryLazy = lazy(() => import("./-components/History"));

export const Route = createLazyFileRoute("/_main/chatRoom/roomInfo/detail/")({
	component: Page,
});

export default function Page() {
	return (
		<>
			<Info></Info>
			<Divider></Divider>
			<Tabs
				items={[
					{ label: "本周总览", key: "week", children: <Week /> },
					{ label: "本月总览", key: "month", children: <Month /> },
					{
						label: "历史总览",
						key: "history",
						children: (
							<Suspense fallback={<Spin spinning></Spin>}>
								<HistoryLazy />
							</Suspense>
						),
					},
					{ label: "房间操作日志", key: "log", children: <Log /> },
					{ label: "房间榜单", key: "rank", children: <Rank /> },
				]}
			></Tabs>
		</>
	);
}
