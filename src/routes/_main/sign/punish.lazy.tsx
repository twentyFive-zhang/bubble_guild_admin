import { createLazyFileRoute } from "@tanstack/react-router";
import { DatePicker, Flex, Form, Input } from "antd";
import type { Dayjs } from "dayjs";
import CommonTable, { PopoverButton } from "@/components/common/table";
import { useRequestMessage } from "@/hooks";
import { getPunishPage, removeMember } from "@/services";

function Search() {
	return (
		<>
			<Form.Item name="date" label="日期">
				<DatePicker.RangePicker></DatePicker.RangePicker>
			</Form.Item>
			<Form.Item name="userCode" label="用户编码">
				<Input placeholder="请输入用户编码" allowClear></Input>
			</Form.Item>
		</>
	);
}

function Main() {
	const { checkMessage } = useRequestMessage();
	return (
		<div>
			<CommonTable
				hideRowSelection
				rowKey={"punishTimeStr"}
				request={getPunishPage}
				sortParams={(params) => {
					const { date, ...rest } = params as {
						date: Dayjs[];
					} & API.PageParams<
						Partial<{
							punishTimeStart: string;
							punishTimeEnd: string;
							userCode: string;
						}>
					>;
					return {
						...rest,
						punishTimeStart: date?.[0]?.format("YYYYMMDD000000"),
						punishTimeEnd: date?.[1]?.format("YYYYMMDD235959"),
					};
				}}
				renderColumns={({ onSearch }) => [
					{ title: "用户ID", dataIndex: "userId" },
					{ title: "用户编码", dataIndex: "userCode" },
					{ title: "用户昵称", dataIndex: "nickname" },
					{ title: "签约时间", dataIndex: "joinTimeStr" },
					{ title: "违规原因", dataIndex: "reasonContent" },
					{ title: "违规日期", dataIndex: "punishTimeStr" },
					{ title: "违规次数", dataIndex: "violationsTimes" },
					{ title: "处罚措施", dataIndex: "punishName" },
					{
						title: "操作",
						dataIndex: "operation",
						render: (_v, record) => (
							<Flex gap={8}>
								<PopoverButton
									title="解约"
									ajax={async () => {
										const res = await removeMember({ userId: record.userId });
										// onSearch();
										if (
											checkMessage(res, {
												isShowSuccess: true,
												operationName: "解约",
											})
										) {
											onSearch();
										}
									}}
								></PopoverButton>
							</Flex>
						),
					},
				]}
				formChildren={<Search></Search>}
			></CommonTable>
		</div>
	);
}

export const Route = createLazyFileRoute("/_main/sign/punish")({
	component: Main,
});
