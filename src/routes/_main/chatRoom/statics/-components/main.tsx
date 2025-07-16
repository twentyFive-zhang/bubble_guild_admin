"use client";

import { useRequest } from "ahooks";
import { Card, Tabs } from "antd";
import { useRequestMessage } from "@/hooks";
import { getFindStat } from "@/services";

export default function Main() {
	const { checkMessage } = useRequestMessage();
	const { data, run } = useRequest(getFindStat, {
		defaultParams: [{ timeType: 6 }],
		onSuccess: (res) => {
			checkMessage(res);
		},
	});

	return (
		<>
			<Tabs
				items={[
					{ label: "本周总览", key: "6" },
					{ label: "本月总览", key: "10" },
				]}
				onChange={(e) => {
					run({ timeType: Number(e) });
				}}
			></Tabs>
			<Card className="text-center">
				<div className="text-lg ">聊天室房间总流水(钻石)</div>
				<div className="text-2xl font-bold mt-4">{data?.data?.turnover}</div>
			</Card>
			<div className="flex justify-between gap-3 mt-3 mb-5">
				<Card className="text-center">
					<div className="text-base ">本周房间直刷流水(钻石)</div>
					<div className="text-lg font-bold mt-4">
						{data?.data?.directTurnover}
					</div>
				</Card>
				<Card className="text-center">
					<div className="text-base ">本周房间背包流水(钻石)</div>
					<div className="text-lg font-bold mt-4">
						{data?.data?.packageTurnover}
					</div>
				</Card>
				<Card className="text-center">
					<div className="text-base ">本周有效开播房间(个)</div>
					<div className="text-lg font-bold mt-4">
						{data?.data?.activeRoomCount}
					</div>
				</Card>
				<Card className="text-center">
					<div className="text-base ">本周主播数(人)</div>
					<div className="text-lg font-bold mt-4">
						{data?.data?.upMicMembers}
					</div>
				</Card>
				<Card className="text-center">
					<div className="text-base ">本周有效主播(人)</div>
					<div className="text-lg font-bold mt-4">
						{data?.data?.incomeMembers}
					</div>
				</Card>
			</div>
		</>
	);
}
