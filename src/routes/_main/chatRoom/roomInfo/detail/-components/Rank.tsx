"use client";
import { useLocation } from "@tanstack/react-router";
import CommonTable from "@/components/common/table";
import { getRoomRankList } from "@/services";

export default function Rank() {
	const location = useLocation();
	return (
		<CommonTable
			hidePagination
			isHideForm
			isHideFormButton
			hideRowSelection
			rowKey="rank"
			request={getRoomRankList}
			sortParams={(params) => ({
				...params,
				roomId: Number((location.search as { roomId: string }).roomId),
			})}
			columns={[
				{ title: "排名", dataIndex: "rank" },
				{ title: "贡献榜用户昵称", dataIndex: "contributeUser" },
				{ title: "贡献榜单值", dataIndex: "contributeValue" },
				{ title: "收益榜用户昵称", dataIndex: "receiveUser" },
				{ title: "用户榜单值", dataIndex: "receiveValue" },
			]}
		></CommonTable>
	);
}
