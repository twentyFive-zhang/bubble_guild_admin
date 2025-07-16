"use client";
import { useLocation } from "@tanstack/react-router";
import { useRequest } from "ahooks";
import { Avatar, Flex } from "antd";
import { getRoomDetailInfo } from "@/services";

export default function Main() {
	const location = useLocation();
	const { data } = useRequest(getRoomDetailInfo, {
		defaultParams: [
			{ roomId: Number((location.search as { roomId: string }).roomId) },
		],
	});
	return (
		<Flex gap={16} align="center">
			<Avatar src={data?.data?.roomIcon} shape="square" size={80}></Avatar>
			<div className="text-base leading-9">
				房间名称: {data?.data?.roomName || "--"}
				<br />
				房间ID: {data?.data?.roomNo || "--"}
			</div>
		</Flex>
	);
}
