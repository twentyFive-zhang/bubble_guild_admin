import { Card, Divider } from "antd";
import { ChartAreaAxes } from "@/routes/_main/dashboard/-components/chart";

export function RoomCard({
	data,
	isHideChart,
	list,
	description,
}: {
	data: Partial<{
		// 开启天数
		openedDays: number;
		// 流水
		turnover: number;
		// 直送流水
		directTurnover: number;
		// 背包流水
		packageTurnover: number;
		// 新用户数量
		sendGiftNewUserCount: number;
	}>;
	list?: { time: string; value: number }[];
	isHideChart?: boolean;
	description?: string;
}) {
	return (
		<Card>
			<div className="grid grid-cols-5">
				<div className="text-center border-r border-solid ">
					<div className="text-base ">开播天数(天)</div>
					<div className="text-lg font-bold mt-4">{data?.openedDays || 0}</div>
				</div>
				<div className="text-center border-r border-solid ">
					<div className="text-base ">新用户(人)</div>
					<div className="text-lg font-bold mt-4">
						{data?.sendGiftNewUserCount || 0}
					</div>
				</div>
				<div className="text-center border-r border-solid">
					<div className="text-base ">房间流水(钻石)</div>
					<div className="text-lg font-bold mt-4">{data?.turnover || 0}</div>
				</div>
				<div className="text-center  border-r border-solid">
					<div className="text-base ">直刷流水(钻石)</div>
					<div className="text-lg font-bold mt-4">
						{data?.directTurnover || 0}
					</div>
				</div>
				<div className="text-center">
					<div className="text-base ">背包流水(钻石)</div>
					<div className="text-lg font-bold mt-4">
						{data?.packageTurnover || 0}
					</div>
				</div>
			</div>
			{!isHideChart && (
				<>
					<Divider></Divider>
					<ChartAreaAxes
						list={list || []}
						description={description}
					></ChartAreaAxes>
				</>
			)}
		</Card>
	);
}
