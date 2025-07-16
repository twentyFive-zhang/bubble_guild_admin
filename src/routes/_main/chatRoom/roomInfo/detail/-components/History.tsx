"use client";
import { useLocation } from "@tanstack/react-router";
import { useRequest } from "ahooks";
import { getRoomHistory } from "@/services";
import { RoomCard } from "./index";

export default function Main() {
	const location = useLocation();
	const { data } = useRequest(getRoomHistory, {
		defaultParams: [
			{ roomId: Number((location.search as { roomId: string }).roomId) },
		],
	});

	return <RoomCard data={data?.data || {}} isHideChart></RoomCard>;
}
