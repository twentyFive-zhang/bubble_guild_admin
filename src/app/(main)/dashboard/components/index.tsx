"use client";

import { Segmented, Table } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const data = {
  // 公会ID
  guildId: 3,
  // 公会编码：页面上显示这个字段
  guildCode: "9365238",
  // 公会名称
  guildName: "测试三号公会",
  // 公会图标
  guildIcon:
    "https://dimengbubble-test.oss-cn-shenzhen.aliyuncs.com/5da513ba89fe451da4172d29681725c3.jpg",
  // 申请加入公会用户数量
  applyJoinUsers: 0,
  // 申请退出公会用户数量
  applyLeaveUsers: 0,
  // 今日流水
  todayTurnover: 0,
  // 本周流水
  thisWeekTurnover: 0,
  // 本月流水
  thisMonthTurnover: 0,
  // 成员数量
  members: 1,
  // 今日上线成员数量
  todayActiveUsers: 0,
  // 今日获得收益成员数量
  todayIncomeUsers: 0,
  // 今日获得收益成员数量相较昨日增长百分比
  todayIncomeUserIncrease: "0%",
  // 近7日流水
  lastSevenDaysTurnoverList: [
    {
      // 时间
      time: "20250611",
      // 流水
      value: 0,
    },
    {
      time: "20250612",
      value: 0,
    },
    {
      time: "20250613",
      value: 0,
    },
    {
      time: "20250614",
      value: 0,
    },
    {
      time: "20250615",
      value: 0,
    },
    {
      time: "20250616",
      value: 0,
    },
    {
      time: "20250617",
      value: 0,
    },
  ],
  // 今日用户流水排名
  todayUserTurnoverRankList: [
    {
      rank: 1,
      userCode: "778844556",
      nickname: "念你如初",
      value: 789,
    },
  ],
  // 今日房间流水排名
  todayRoomTurnoverRankList: [
    {
      rank: 1,
      roomNo: "556677",
      roomName: "念你如初新厅开业",
      value: 7000,
    },
  ],
};

export const RankList = () => {
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
              dataSource: data.todayUserTurnoverRankList,
            }
          : {
              columns: [
                { dataIndex: "rank", title: "排名" },
                { dataIndex: "roomName", title: "房间名称" },
                { dataIndex: "roomNo", title: "ID" },
                { dataIndex: "value", title: "今日流水" },
              ],
              dataSource: data.todayRoomTurnoverRankList,
            })}></Table>
    </div>
  );
};

export const ApplyCard = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 h-30 items-center">
      <div
        className="text-center border-r border-solid cursor-pointer"
        onClick={() => {
          router.push("/sign/apply");
        }}>
        <div className="text-base ">待审核加入成员</div>
        <div className="text-lg font-bold mt-4">{data.applyJoinUsers}</div>
      </div>
      <div
        className="text-center  cursor-pointer"
        onClick={() => {
          router.push("/sign/remove");
        }}>
        <div className="text-base ">待审核退出成员</div>
        <div className="text-lg font-bold mt-4">{data.applyJoinUsers}</div>
      </div>
    </div>
  );
};
