"use client";
import { getRoomDetailInfo } from "@/app/actions";
import { useRequest } from "ahooks";
import { Avatar, Flex } from "antd";
import { useSearchParams } from "next/navigation";

export default function Main() {
  const searchParams = useSearchParams();
  const { data } = useRequest(getRoomDetailInfo, {
    defaultParams: [{ roomId: Number(searchParams.get("roomId")!) }],
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
