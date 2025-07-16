"use client";

import { useLocation, useNavigate } from "@tanstack/react-router";
import { Button, Form, Tabs } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import CommonTable from "@/components/common/table";
import { getRoomList } from "@/services";

export function Search() {
	return (
		<>
			<Form.Item name="timeType" noStyle>
				<div></div>
			</Form.Item>

			<Form.Item name="statTime" noStyle>
				<div></div>
			</Form.Item>
		</>
	);
}

export default function Main() {
	const [activeKey, setActiveKey] = useState<string>("1");
	// const getTime = () => {};
	const navigate = useNavigate();
	const pathname = useLocation({ select: (location) => location.pathname });
	return (
		<div>
			<CommonTable
				initialValues={{
					timeType: 6,
					statTime: dayjs().startOf("week").format("YYYYMMDD"),
				}}
				renderHeader={({ onSearch, form }) => (
					<Tabs
						activeKey={activeKey}
						onChange={(e) => {
							form.setFieldsValue(
								e === "1"
									? {
											timeType: 6,
											statTime: dayjs().startOf("week").format("YYYYMMDD"),
										}
									: e === "2"
										? { timeType: 10, statTime: dayjs().format("YYYYMM") }
										: {
												timeType: undefined,
												statTime: undefined,
											},
							);
							setActiveKey(e);
							onSearch({ pageNum: 1 });
						}}
						items={[
							{ label: "本周总览", key: "1" },
							{ label: "本月总览", key: "2" },
							{ label: "历史总览", key: "3" },
						]}
					></Tabs>
				)}
				hideRowSelection
				hidePagination
				rowKey={"roomId"}
				request={getRoomList}
				columns={[
					{ title: "房间ID", dataIndex: "roomNo" },
					{ title: "房间名称", dataIndex: "roomName" },
					{ title: "房间类型", dataIndex: "roomCategoryName" },
					{ title: "最近一次开播", dataIndex: "lastOpenTimeStr" },
					{ title: "房间流水", dataIndex: "turnover" },
					{ title: "直刷流水", dataIndex: "directTurnover" },
					{ title: "背包流水", dataIndex: "packageTurnover" },
					{ title: "新用户", dataIndex: "sendGiftNewUserCount" },
					{
						title: "操作",
						dataIndex: "operation",
						render: (_v, record) => (
							<Button
								type="link"
								onClick={() => {
									navigate({
										to: `${pathname}/detail`,
										search: { roomId: record.roomId },
									});
								}}
							>
								详情
							</Button>
						),
					},
				]}
				isHideFormButton
				formChildren={<Search></Search>}
			></CommonTable>
		</div>
	);
}
