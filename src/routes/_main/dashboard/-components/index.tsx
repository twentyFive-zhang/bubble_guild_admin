import { useRequest } from "ahooks";
import { Avatar, Card, Col, Divider, Flex, Row, Spin, Upload } from "antd";
import { useRequestMessage } from "@/hooks";
import { home, updateGuildIcon, uploadFile } from "@/services";
import { ChartAreaAxes } from "./chart";
import { ApplyCard, RankList } from "./main";

function UploadAvatar({
	src,
	onSuccess,
}: {
	src?: string;
	onSuccess: () => void;
}) {
	const { checkMessage } = useRequestMessage();
	const { run: update, loading: spinning } = useRequest(updateGuildIcon, {
		manual: true,
		onSuccess: (res) => {
			if (
				checkMessage(res, { isShowSuccess: true, successMessage: "切换成功" })
			) {
				onSuccess();
			}
		},
	});
	const { run, loading } = useRequest(uploadFile, {
		manual: true,
		onSuccess: (res) => {
			if (
				checkMessage(res, { isShowSuccess: true, successMessage: "上传成功" })
			) {
				update({ icon: res.data });
			}
		},
	});
	return (
		<Upload
			accept=".png, .jpg, .jpeg"
			showUploadList={false}
			beforeUpload={(file) => {
				run({ file });
			}}
			fileList={[]}
			maxCount={1}
			customRequest={() => {}}
			disabled={loading || spinning}
		>
			<Spin
				spinning={loading || spinning}
				tip={(loading && "上传中...") || (spinning && "切换中...")}
			>
				<div className="relative cursor-pointer rounded-[6px] overflow-hidden">
					<div className="absolute bottom-0 w-full z-30 bg-black/55 text-white text-center py-1">
						点击切换
					</div>
					<Avatar src={src} shape="square" size={120}></Avatar>
				</div>
			</Spin>
		</Upload>
	);
}

export default function Page() {
	const { checkMessage } = useRequestMessage();
	const { data, run, loading } = useRequest(home, {
		onSuccess: (res) => {
			checkMessage(res);
		},
	});
	return (
		<Spin spinning={loading}>
			<div className="flex flex-col gap-4">
				<Row gutter={16}>
					<Col span={10}>
						<Card title="工会信息" variant="borderless">
							<Flex gap={16}>
								<UploadAvatar
									src={data?.data?.guildIcon}
									onSuccess={run}
								></UploadAvatar>
								<div className="text-base leading-9">
									工会昵称: {data?.data?.guildName || "--"}
									<br />
									工会ID: {data?.data?.guildId || "--"}
									<br />
									入驻时间: {"补充"}
								</div>
							</Flex>
						</Card>
					</Col>
					<Col span={14}>
						<Card title="待办事项" variant="borderless" className="h-full">
							<ApplyCard data={data?.data}></ApplyCard>
						</Card>
					</Col>
				</Row>
				<Card title="内容数据">
					<div className="grid grid-cols-3">
						<div className="text-center border-r border-solid ">
							<div className="text-base ">今日实时流水(钻石)</div>
							<div className="text-lg font-bold mt-4">
								{data?.data?.todayTurnover || 0}
							</div>
						</div>
						<div className="text-center border-r border-solid ">
							<div className="text-base ">本周实时流水(钻石)</div>
							<div className="text-lg font-bold mt-4">
								{data?.data?.thisWeekTurnover || 0}
							</div>
						</div>
						<div className="text-center">
							<div className="text-base ">本月实时流水(钻石)</div>
							<div className="text-lg font-bold mt-4">
								{data?.data?.thisMonthTurnover || 0}
							</div>
						</div>
					</div>
				</Card>
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
									<div className="text-base ">今日上线(人)</div>
									<div className="text-lg font-bold mt-4">
										{data?.data?.todayActiveUsers || 0}
									</div>
								</div>
								<div className="text-center border-r border-solid">
									<div className="text-base ">今日收益(钻石)</div>
									<div className="text-lg font-bold mt-4">
										{data?.data?.todayIncomeUsers || 0}
									</div>
								</div>
								<div className="text-center">
									<div className="text-base ">较昨日新增</div>
									<div className="text-lg font-bold mt-4">
										{data?.data?.todayIncomeUserIncrease || 0}
									</div>
								</div>
							</div>
							<Divider></Divider>
							<ChartAreaAxes
								list={data?.data?.lastSevenDaysTurnoverList || []}
							></ChartAreaAxes>
						</Card>
					</Col>
					<Col span={8}>
						<Card title="今日流水排名" className="h-full">
							<RankList data={data?.data}></RankList>
						</Card>
					</Col>
				</Row>
			</div>
		</Spin>
	);
}
