"use client";

import { useRequest } from "ahooks";
import { Card, DatePicker, Segmented, Table } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import { useState } from "react";
import { getStatByTimeRange } from "@/services";

const timeMap = {
	Weekly: "本周",
	Monthly: "本月",
	Daily: "昨日",
};
export const RankList = ({
	data,
}: {
	data?: Partial<{
		// 成员数量
		members: number;
		// 本月新成员数量
		thisMonthNewMembers: number;
		// 本月离会成员数量
		thisMonthLeaveMembers: number;
		// 活跃房间数量
		activeRoomCount: number;
		// 流水列表
		turnoverList: {
			// 日期
			time: string;
			// 值
			value: number;
		}[];
		//成员日排名
		memberDailyRankList: {
			// 用户编码
			userCode: string;
			// 用户昵称
			nickname: string;
			// 排名
			rank: number;
			// 值
			value: number;
		}[];
		// 成员周排名
		memberWeeklyRankList: {
			// 用户编码
			userCode: string;
			// 用户昵称
			nickname: string;
			// 排名
			rank: number;
			// 值
			value: number;
		}[];
		// 成员月排名
		memberMonthlyRankList: {
			// 用户编码
			userCode: string;
			// 用户昵称
			nickname: string;
			// 排名
			rank: number;
			// 值
			value: number;
		}[];
		// 房间日排名
		roomDailyRankList: {
			// 房间编码
			roomNo: string;
			// 房间名称
			roomName: string;
			rank: number;
			value: number;
		}[];
		roomWeeklyRankList: {
			// 房间编码
			roomNo: string;
			// 房间名称
			roomName: string;
			rank: number;
			value: number;
		}[];
		roomMonthlyRankList: {
			// 房间编码
			roomNo: string;
			// 房间名称
			roomName: string;
			rank: number;
			value: number;
		}[];
	}>;
}) => {
	const [type, setType] = useState("member");
	const [time, setTime] = useState<string>("Weekly");

	return (
		<Card
			// @ts-ignore
			title={`${timeMap[time]}流水排名`}
			className="h-full"
			extra={
				<Segmented
					defaultValue="Weekly"
					options={[
						{ label: "本周", value: "Weekly" },
						{ label: "本月", value: "Monthly" },
						{ label: "昨日", value: "Daily" },
					]}
					onChange={(v) => {
						setTime(v);
					}}
				></Segmented>
			}
		>
			<div className="flex flex-col gap-3">
				<div>
					<Segmented
						defaultValue="member"
						onChange={(v) => setType(v)}
						options={[
							{ label: "主播", value: "member" },
							{ label: "房间", value: "room" },
						]}
					></Segmented>
				</div>
				{/* @ts-ignore */}
				<Table
					size="small"
					pagination={false}
					rowKey="rank"
					// @ts-ignore
					dataSource={data?.[`${type}${time}RankList`] || []}
					{...(type === "member"
						? {
								columns: [
									{ dataIndex: "rank", title: "排名" },
									{ dataIndex: "nickname", title: "用户昵称" },
									{ dataIndex: "userCode", title: "ID" },
									{ dataIndex: "value", title: "今日流水" },
								],
							}
						: {
								columns: [
									{ dataIndex: "rank", title: "排名" },
									{ dataIndex: "roomName", title: "房间名称" },
									{ dataIndex: "roomNo", title: "ID" },
									{ dataIndex: "value", title: "今日流水" },
								],
							})}
				></Table>
			</div>
		</Card>
	);
};

export function TimeCard() {
	function getTime([d1, d2]: Dayjs[]) {
		return {
			startTime: d1.format("YYYYMMDD"),
			endTime: d2.format("YYYYMMDD"),
		};
	}
	const { run, data } = useRequest(getStatByTimeRange, {
		manual: true,
		defaultParams: [getTime([dayjs().startOf("week"), dayjs()])],
	});
	return (
		<Card
			title="数据管理"
			extra={
				<DatePicker.RangePicker
					allowClear={false}
					onChange={(e) => {
						run(getTime(e as Dayjs[]));
					}}
					defaultValue={[dayjs().startOf("week"), dayjs()]}
				></DatePicker.RangePicker>
			}
		>
			<div className="grid grid-cols-4">
				<div className="text-center border-r border-solid ">
					<div className="text-base ">活跃数(人)</div>
					<div className="text-lg font-bold mt-4">
						{data?.data?.activeMembers || 0}
					</div>
				</div>
				<div className="text-center border-r border-solid ">
					<div className="text-base ">有效活跃数(人)</div>
					<div className="text-lg font-bold mt-4">
						{data?.data?.upMicMembers || 0}
					</div>
				</div>
				<div className="text-center border-r border-solid">
					<div className="text-base ">有效收益款(人)</div>
					<div className="text-lg font-bold mt-4">
						{data?.data?.incomeMembers || 0}
					</div>
				</div>
				<div className="text-center ">
					<div className="text-base ">总流水(钻石)</div>
					<div className="text-lg font-bold mt-4">
						{data?.data?.turnover || 0}
					</div>
				</div>
			</div>
		</Card>
	);
}
