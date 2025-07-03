"use client";
import { getRoomHistory } from "@/app/actions";
import { RoomCard } from "../../components";
import { useSearchParams } from "next/navigation";
import { useRequest } from "ahooks";

export default function Main() {
  const searchParams = useSearchParams();
  const { data } = useRequest(getRoomHistory, {
    defaultParams: [{ roomId: Number(searchParams.get("roomId")!) }],
  });

  return <RoomCard data={data?.data || {}} isHideChart></RoomCard>;
}
