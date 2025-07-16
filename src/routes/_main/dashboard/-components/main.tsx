"use client";

import { useNavigate } from "@tanstack/react-router";
import { Segmented, Table } from "antd";
import { useState } from "react";
import type { home } from "@/services";

type IData = Awaited<ReturnType<typeof home>>;

export const RankList = ({ data }: Partial<IData>) => {
	const [type, setType] = useState("user");

	return (
		<div className="flex flex-col gap-3">
			<div>
				<Segmented
					defaultValue="user"
					onChange={(v) => setType(v)}
					options={[
						{ label: "主播", value: "user" },
						{ label: "房间", value: "room" },
					]}
				></Segmented>
			</div>
			{/* @ts-ignore */}
			<Table
				size="small"
				pagination={false}
				rowKey="rank"
				{...(type === "user"
					? {
							columns: [
								{ dataIndex: "rank", title: "排名" },
								{ dataIndex: "nickname", title: "用户昵称" },
								{ dataIndex: "userCode", title: "ID" },
								{ dataIndex: "value", title: "今日流水" },
							],
							dataSource: data?.todayUserTurnoverRankList || [],
						}
					: {
							columns: [
								{ dataIndex: "rank", title: "排名" },
								{ dataIndex: "roomName", title: "房间名称" },
								{ dataIndex: "roomNo", title: "ID" },
								{ dataIndex: "value", title: "今日流水" },
							],
							dataSource: data?.todayRoomTurnoverRankList || [],
						})}
			></Table>
		</div>
	);
};

export function ApplyCard({ data }: Partial<IData>) {
	// const router = useRouter();
	const navigate = useNavigate();

	return (
		<div className="grid grid-cols-2 h-30 items-center">
			<div
				className="text-center border-r border-solid cursor-pointer"
				onClick={() => {
					navigate({ href: "/sign/apply" });
				}}
			>
				<div className="text-base ">待审核加入成员</div>
				<div className="text-lg font-bold mt-4">
					{data?.applyJoinUsers || 0}
				</div>
			</div>
			<div
				className="text-center  cursor-pointer"
				onClick={() => {
					navigate({ href: "/sign/remove" });
				}}
			>
				<div className="text-base ">待审核退出成员</div>
				<div className="text-lg font-bold mt-4">
					{data?.applyLeaveUsers || 0}
				</div>
			</div>
		</div>
	);
}
