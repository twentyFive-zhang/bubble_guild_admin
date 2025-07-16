"use client";
import { useLocation } from "@tanstack/react-router";
import { useRequest } from "ahooks";
import dayjs from "dayjs";
import { getRoomDetail } from "@/services";
import { RoomCard } from "./index";

export default function Main() {
	const location = useLocation();
	const { data } = useRequest(getRoomDetail, {
		defaultParams: [
			{
				roomId: Number((location.search as { roomId: string }).roomId),
				timeType: 6,
				statTime: dayjs().startOf("week").format("YYYYMMDD"),
			},
		],
	});

	return (
		<RoomCard
			description="本周"
			data={data?.data || {}}
			list={data?.data?.turnoverList || []}
		></RoomCard>
	);
}
