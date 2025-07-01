"use client";

import { Segmented, Table } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const RankList = ({
  data,
}: {
  data: {
    todayRoomTurnoverRankList: {
      rank: number;
      roomNo: string;
      roomName: string;
      value: number;
    }[];
    todayUserTurnoverRankList: {
      rank: number;
      userCode: string;
      nickname: string;
      value: number;
    }[];
  };
}) => {
  const [type, setType] = useState("user");

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Segmented
          defaultValue="user"
          onChange={(v) => setType(v)}
          options={[
            { label: "主播", value: "user" },
            { label: "房间", value: "room" },
          ]}></Segmented>
      </div>
      {/* @ts-ignore */}
      <Table
        size="small"
        pagination={false}
        rowKey="rank"
        {...(type === "user"
          ? {
              columns: [
                { dataIndex: "rank", title: "排名" },
                { dataIndex: "nickname", title: "用户昵称" },
                { dataIndex: "userCode", title: "ID" },
                { dataIndex: "value", title: "今日流水" },
              ],
              dataSource: data?.todayUserTurnoverRankList || [],
            }
          : {
              columns: [
                { dataIndex: "rank", title: "排名" },
                { dataIndex: "roomName", title: "房间名称" },
                { dataIndex: "roomNo", title: "ID" },
                { dataIndex: "value", title: "今日流水" },
              ],
              dataSource: data?.todayRoomTurnoverRankList || [],
            })}></Table>
    </div>
  );
};

export const ApplyCard = ({
  data,
}: {
  data: { applyJoinUsers: number; applyLeaveUsers: number };
}) => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 h-30 items-center">
      <div
        className="text-center border-r border-solid cursor-pointer"
        onClick={() => {
          router.push("/sign/apply");
        }}>
        <div className="text-base ">待审核加入成员</div>
        <div className="text-lg font-bold mt-4">{data?.applyJoinUsers || 0}</div>
      </div>
      <div
        className="text-center  cursor-pointer"
        onClick={() => {
          router.push("/sign/remove");
        }}>
        <div className="text-base ">待审核退出成员</div>
        <div className="text-lg font-bold mt-4">{data?.applyLeaveUsers || 0}</div>
      </div>
    </div>
  );
};
