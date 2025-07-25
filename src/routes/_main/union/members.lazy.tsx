import { createLazyFileRoute } from "@tanstack/react-router";
import { Form, Input, Select } from "antd";
import CommonTable, { PopoverButton } from "@/components/common/table";
import { useRequestMessage } from "@/hooks";
import { getMemberListPage, setMemberRole } from "@/services";

function Search() {
	return (
		<>
			<Form.Item name="guildUserRole" label="身份类型">
				<Select
					options={[
						{ label: "工会管理员", value: 2 },
						{ label: "普通成员", value: 10 },
					]}
					placeholder="请选择身份类型"
					allowClear
					style={{ width: 200 }}
				></Select>
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
				rowKey={"userId"}
				request={getMemberListPage}
				renderColumns={({ onSearch }) => [
					{ dataIndex: "userCode", title: "用户ID" },
					{ dataIndex: "nickname", title: "用户昵称" },
					{ dataIndex: "userRoleName", title: "工会身份" },
					{
						dataIndex: "operation",
						title: "操作",
						render: (_v, record) => (
							<PopoverButton
								ajax={async () => {
									const res = await setMemberRole({
										userId: record.userId,
										status: record.userRole === 2 ? 0 : 1,
									});
									// onSearch();

									if (
										checkMessage(res, {
											isShowSuccess: true,
											operationName: `${record.userRole === 2 ? "解除" : "设为"}管理员`,
										})
									) {
										onSearch();
									}
								}}
								title={`${record.userRole === 2 ? "解除" : "设为"}管理员`}
							></PopoverButton>
						),
					},
				]}
				formChildren={<Search></Search>}
			></CommonTable>
		</div>
	);
}

export const Route = createLazyFileRoute("/_main/union/members")({
	component: Main,
});
