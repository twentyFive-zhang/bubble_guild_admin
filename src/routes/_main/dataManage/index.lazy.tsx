import { createLazyFileRoute } from "@tanstack/react-router";
import { useRequest } from "ahooks";
import { Card, Col, Divider, Row } from "antd";
import { useRequestMessage } from "@/hooks";
import { getMonthStat } from "@/services";
import { ChartAreaAxes } from "../dashboard/-components/chart";
import { RankList, TimeCard } from "./-components";

export const Route = createLazyFileRoute("/_main/dataManage/")({
	component: Page,
});

export default function Page() {
	const { checkMessage } = useRequestMessage();
	const { data } = useRequest(getMonthStat, {
		onSuccess: (res) => {
			checkMessage(res);
		},
	});
	// const { data } = await getMonthStat();
	return (
		<div className="flex flex-col gap-4">
			<TimeCard></TimeCard>
			<Row gutter={16}>
				<Col span={16}>
					<Card>
						<div className="grid grid-cols-4">
							<div className="text-center border-r border-solid ">
								<div className="text-base ">工会成员(人)</div>
								<div className="text-lg font-bold mt-4">
									{data?.data?.members || 0}
								</div>
							</div>
							<div className="text-center border-r border-solid ">
								<div className="text-base ">本月新增成员(人)</div>
								<div className="text-lg font-bold mt-4">
									{data?.data?.thisMonthNewMembers || 0}
								</div>
							</div>
							<div className="text-center border-r border-solid">
								<div className="text-base ">本月退出成员(人)</div>
								<div className="text-lg font-bold mt-4">
									{data?.data?.thisMonthLeaveMembers || 0}
								</div>
							</div>
							<div className="text-center">
								<div className="text-base ">本月有效开播房间(个)</div>
								<div className="text-lg font-bold mt-4">
									{data?.data?.activeRoomCount || 0}
								</div>
							</div>
						</div>
						<Divider></Divider>
						<ChartAreaAxes
							description="近30日"
							list={data?.data?.turnoverList || []}
						></ChartAreaAxes>
					</Card>
				</Col>
				<Col span={8}>
					<RankList data={data?.data}></RankList>
				</Col>
			</Row>
		</div>
	);
}
