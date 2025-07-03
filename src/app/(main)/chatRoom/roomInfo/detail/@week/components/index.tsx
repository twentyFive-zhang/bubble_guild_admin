"use client";
import { getRoomDetail } from "@/app/actions";
import { RoomCard } from "../../components";
import { useSearchParams } from "next/navigation";
import { useRequest } from "ahooks";
import dayjs from "dayjs";

export default function Main() {
  const searchParams = useSearchParams();
  const { data } = useRequest(getRoomDetail, {
    defaultParams: [
      {
        roomId: Number(searchParams.get("roomId")!),
        timeType: 6,
        statTime: dayjs().startOf("week").format("YYYYMMDD"),
      },
    ],
  });

  return (
    <RoomCard
      description="本周"
      data={data?.data || {}}
      list={data?.data?.turnoverList || []}></RoomCard>
  );
}
